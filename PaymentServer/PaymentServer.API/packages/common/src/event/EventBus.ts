import { Logger } from "winston";
import { Connection } from "amqplib";
import { IEvent } from "./IEvent";
import { ExchangeType, IEventBus, Options } from "./IEventBus";
import { AmqpConnection, IEventHandlerModule, ILogger } from "../ioc";
import { IEventHandler } from "./IEventHandler";
import { EventDescriptor } from "./EventDescriptor";
import { DomainException } from "../exception/DomainException";
import { injectable } from "inversify";
import { IRejectedEvent } from "./IRejectedEvent";

@injectable()
export class EventBus implements IEventBus {
    private readonly _connection: Connection;
    private readonly _logger: Logger;
    private readonly _eventHandlers: IEventHandler<IEvent>[];
    constructor(
        @ILogger logger: Logger,
        @AmqpConnection connection: Connection,
        @IEventHandlerModule eventHandlers: IEventHandler<IEvent>[]) {
        this._connection = connection;
        this._logger = logger;
        this._eventHandlers = eventHandlers;
    }
    async publish<TEvent extends IEvent>(exchange: string,
        event: TEvent,
        options: Options): Promise<void> {

        const { correlationId, replyTo } = options;
        // assert exchange
        const channel = await this._connection.createChannel();
        await channel.assertExchange(exchange, ExchangeType.TOPIC, { durable: false });


        const routingKey = `${exchange}.${event.eventName}`;
        const data = JSON.stringify(event);
        channel.publish(exchange, routingKey, Buffer.from(data), { correlationId, replyTo });

        this._logger.info(`publish event ${event.eventName} to exchange ${exchange}`);
    }
    async subscribe<TEvent extends IEvent>(
        exchange: string,
        onError?: ((event: TEvent, error: DomainException) => IRejectedEvent) | undefined): Promise<void> {
        // assert exchange
        const channel = await this._connection.createChannel();
        await channel.assertExchange(exchange, ExchangeType.TOPIC, { durable: false });

        // bind queue
        const queue = await channel.assertQueue("", { exclusive: false });

        const routingKey = `${exchange}.#`;
        await channel.bindQueue(queue.queue, exchange, routingKey);

        await channel.consume(queue.queue, async (message) => {
            if (!message) {
                // error here
                return;
            }
            // parse message
            const _message = message.content.toString();
            const payload = JSON.parse(_message);

            // payload to event
            // get handler
            const handlers = this._eventHandlers.filter(handler => handler.event == payload.eventName);
            const event = EventDescriptor.createEvent(payload);

            // try handle event
            await this.handleEvent(exchange, event as TEvent, handlers, message.properties, onError);

            channel.ack(message);
        }, {
            noAck: false
        })
    }

    private async handleEvent<TEvent extends IEvent>(
        exchange: string,
        event: TEvent,
        handlers: IEventHandler<IEvent>[],
        options: Options,
        onError?: (event: TEvent, error: DomainException) => IRejectedEvent) {
        // add retry policy
        try {
            this._logger.info(`try to handling event ${event.eventName} at exchange ${exchange}`);
            await Promise.all(handlers.map(handler => handler.Handle(event)));
            this._logger.info(`handled event ${event.eventName} at exchange ${exchange}`);
        } catch (err) {
            if (err instanceof DomainException && onError) {
                const _event = onError(event, err);
                await this.publish(exchange, _event, options);
                this._logger.info(`publishing event ${_event.eventName} at exchange ${exchange}`);
            }

            throw new Error(`something wrong with when handling event ${event.eventName}`);
        }

    }
}


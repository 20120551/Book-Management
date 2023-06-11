import { AmqpClient, IPublisher, Injectable } from "@movie/shared";
import { AMQPConnection } from "./AmqpClient";

@Injectable
export default class Publisher implements IPublisher {
    private readonly _amqpClient: AMQPConnection;

    constructor(
        @AmqpClient amqpClient: AMQPConnection
    ) {
        this._amqpClient = amqpClient;
    }

    async Publish<TRequest>(
        exchange: string,
        type: string,
        routingKey: string,
        data: TRequest,
        options?: Object): Promise<void> {
        try {
            // create channel
            const channel = await this._amqpClient.createChannel();
            // serialize message
            const serializeData = JSON.stringify(data);
            // create exchange
            const message = Buffer.from(serializeData, "utf-8");
            // publishing event
            await channel.assertExchange(exchange, type, { durable: false });
            channel.publish(exchange, routingKey, message, options);
            console.log(`Publish to exchange ${exchange} with routing key ${routingKey}`);
        } catch (err) {
            console.log(`error when publishing message ${err}`);
        }
    }

}
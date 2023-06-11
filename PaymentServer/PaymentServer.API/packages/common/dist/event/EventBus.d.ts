import { Logger } from "winston";
import { Connection } from "amqplib";
import { IEvent } from "./IEvent";
import { IEventBus, Options } from "./IEventBus";
import { IEventHandler } from "./IEventHandler";
import { DomainException } from "../exception/DomainException";
import { IRejectedEvent } from "./IRejectedEvent";
export declare class EventBus implements IEventBus {
    private readonly _connection;
    private readonly _logger;
    private readonly _eventHandlers;
    constructor(logger: Logger, connection: Connection, eventHandlers: IEventHandler<IEvent>[]);
    publish<TEvent extends IEvent>(exchange: string, event: TEvent, options: Options): Promise<void>;
    subscribe<TEvent extends IEvent>(exchange: string, onError?: ((event: TEvent, error: DomainException) => IRejectedEvent) | undefined): Promise<void>;
    private handleEvent;
}

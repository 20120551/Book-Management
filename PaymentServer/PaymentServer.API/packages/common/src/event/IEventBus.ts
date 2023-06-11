import { DomainException } from "../exception/DomainException";
import { IEvent } from "./IEvent";
import { IRejectedEvent } from "./IRejectedEvent";

export type Options = {
    correlationId: string,
    replyTo: string
}

export enum ExchangeType {
    TOPIC = "topic",
    DIRECT = "direct",
    FANOUT = "fanout"
}
export interface IEventBus {
    publish<TEvent extends IEvent>(exchange: string, event: TEvent, options: Options): Promise<void>;
    subscribe<TEvent extends IEvent>(
        exchange: string,
        onError?: (event: TEvent, error: DomainException) => IRejectedEvent): Promise<void>;
}
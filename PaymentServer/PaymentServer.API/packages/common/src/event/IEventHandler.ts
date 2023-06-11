import { IEvent } from "./IEvent";

export interface IEventHandler<TEvent extends IEvent> {
    event: string;
    Handle(event: TEvent): Promise<void>;
}
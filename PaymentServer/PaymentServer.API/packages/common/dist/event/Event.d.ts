import { IEvent } from "./IEvent";
export type EVENT_OMIT = keyof IEvent;
export type StorageEvent = Omit<IEvent, keyof IEvent>;
export declare abstract class Event implements IEvent {
    abstract eventName: string;
    abstract aggregationName: string;
    aggregationId: string;
    version?: number;
    constructor(aggregationId: string);
}

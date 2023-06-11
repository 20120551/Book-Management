import { IEvent } from "./IEvent";

export type EVENT_OMIT = keyof IEvent;
export type StorageEvent = Omit<IEvent, keyof IEvent>;

export abstract class Event implements IEvent {
    abstract eventName: string;
    abstract aggregationName: string;
    public aggregationId: string;
    public version?: number;

    constructor(aggregationId: string) {
        this.aggregationId = aggregationId;
    }
}
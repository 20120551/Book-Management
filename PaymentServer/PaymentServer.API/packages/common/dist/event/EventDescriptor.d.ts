import { StorageEvent } from "./Event";
import { IEvent } from "./IEvent";
export declare class EventDescriptor {
    readonly eventName: string;
    readonly aggregationId: string;
    readonly aggregationName: string;
    readonly version: number;
    readonly payload: StorageEvent;
    private constructor();
    static createEvent(event: EventDescriptor): IEvent;
    static create(event: IEvent): EventDescriptor;
}

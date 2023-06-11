import { StorageEvent } from "./Event";
import { IEvent } from "./IEvent";

export class EventDescriptor {
    constructor(
        public readonly eventName: string,
        public readonly aggregationId: string,
        public readonly aggregationName: string,
        public readonly version: number,
        public readonly payload: StorageEvent
    ) {

    }


    public static createEvent(event: EventDescriptor): IEvent {
        return {
            aggregationId: event.aggregationId,
            eventName: event.eventName,
            version: event.version,
            aggregationName: event.aggregationName,
            ...event.payload
        }
    }

    public static create(event: IEvent): EventDescriptor {
        const { aggregationId, aggregationName, version, eventName, ...payload } = event;
        return new EventDescriptor(eventName, aggregationId, aggregationName, version || -1, payload);
    }
}
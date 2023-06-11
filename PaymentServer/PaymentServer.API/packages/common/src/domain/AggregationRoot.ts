import { nanoid } from "nanoid";
import { IEvent } from "../event/IEvent";

export class AggregationRoot {
    [x: string]: any;
    public guid: string;

    private version: number = -1;
    private events: IEvent[] = [];

    constructor(guid?: string) {
        this.guid = guid || nanoid();
    }

    public clearEvent() {
        this.events = [];
    }

    public loadEvent(events: IEvent[]) {
        events.forEach(event => {
            this.applyEvent(event);
            this.version++;
        });
    }

    public applyEvent(event: IEvent) {
        this[`apply${event.eventName}`] = event;
        this.events.push(event);
    }

    public getUncommitedEvent() {
        return this.events;
    }

}
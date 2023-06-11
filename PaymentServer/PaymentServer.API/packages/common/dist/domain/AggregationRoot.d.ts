import { IEvent } from "../event/IEvent";
export declare class AggregationRoot {
    [x: string]: any;
    guid: string;
    private version;
    private events;
    constructor(guid?: string);
    clearEvent(): void;
    loadEvent(events: IEvent[]): void;
    applyEvent(event: IEvent): void;
    getUncommitedEvent(): IEvent[];
}

import IDomainEvent from "./IDomainEvent";
export default class Aggregation {
    Version: number;
    private _events;
    Events: IDomainEvent[];
    protected AddEvent(event: IDomainEvent): void;
    CreateEvent(): void;
}

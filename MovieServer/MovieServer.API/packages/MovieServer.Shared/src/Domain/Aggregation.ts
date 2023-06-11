import IDomainEvent from "./IDomainEvent";

export default class Aggregation {
    public Version: number = 0;
    private _events: IDomainEvent[] = [];
    public Events: IDomainEvent[] = this._events;

    protected AddEvent(event: IDomainEvent): void {
        this._events.push(event);
    }

    public CreateEvent(): void {
        this._events = []
    }
}
import { IEvent } from "../event/IEvent";
export interface IEventSource {
    findById(aggregationId: string): Promise<IEvent[] | null>;
    create(aggregationId: string, events: IEvent[], version: number): Promise<void>;
    delete(aggregationId: string): Promise<void>;
}

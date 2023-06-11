import { AggregationRoot } from "../domain/AggregationRoot";
import { IRepository } from "./IRepository";
import { IEventSource } from "./IEventSource";
export declare abstract class Repository<TEntity extends AggregationRoot> implements IRepository<TEntity> {
    private readonly _eventSource;
    private readonly _constructor;
    constructor(eventSource: IEventSource, constructor: new (...args: any[]) => TEntity);
    findById(id: string): Promise<TEntity | null>;
    create(entity: TEntity, version: number): Promise<void>;
    delete(entity: TEntity): Promise<void>;
}

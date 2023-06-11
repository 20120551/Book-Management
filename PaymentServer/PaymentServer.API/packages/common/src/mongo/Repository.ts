import { AggregationRoot } from "../domain/AggregationRoot";
import { Filter, IRepository, Query } from "./IRepository";
import { Injectable, Unmanaged } from "../ioc";
import { IEventSource } from "./IEventSource";

@Injectable
export abstract class Repository<TEntity extends AggregationRoot> implements IRepository<TEntity>
{
    private readonly _eventSource: IEventSource;
    private readonly _constructor: { new(...args: any[]): TEntity };
    constructor(
        @Unmanaged eventSource: IEventSource,
        @Unmanaged constructor: new (...args: any[]) => TEntity
    ) {
        this._eventSource = eventSource;
        this._constructor = constructor;
    }
    async findById(id: string): Promise<TEntity | null> {
        const events = await this._eventSource.findById(id);

        if (events == null) {
            throw new Error("");
        }
        // instantiate
        const aggregation = new this._constructor(id);
        aggregation.loadEvent(events);
        return aggregation;
    }

    async create(entity: TEntity, version: number): Promise<void> {
        const events = entity.getUncommitedEvent();
        await this._eventSource.create(entity.guid, events, version);
    }
    async delete(entity: TEntity): Promise<void> {
        const { aggregationId } = entity;
        await this._eventSource.delete(aggregationId);
    }

}
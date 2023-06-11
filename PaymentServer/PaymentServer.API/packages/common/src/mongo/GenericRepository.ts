import { Collection, Db, OptionalUnlessRequiredId } from "mongodb";
import { Injectable, Unmanaged } from "../ioc";
import { IGenericRepository } from "./IGenericRepository";
import { Filter, Query } from "./IRepository";
import { plainToInstance } from "class-transformer";

@Injectable
export class GenericRepository<TEntity extends object> implements IGenericRepository<TEntity>
{
    private readonly _collection: Collection<TEntity>;
    private readonly _constructor: new (...args: any[]) => TEntity;
    constructor(
        @Unmanaged constructor: { new(...args: any[]): TEntity },
        @Unmanaged db: Db,
        @Unmanaged name: string
    ) {
        this._collection = db.collection<TEntity>(name);
        this._constructor = constructor;
    }
    async findById(filter: Filter<TEntity>): Promise<TEntity | null> {
        const entity = await this._collection.findOne(filter);
        return plainToInstance(this._constructor, entity);
    }
    async find(filter: Filter<TEntity>, query: Query): Promise<TEntity[] | null> {
        const entities = await this._collection
            .find(filter)
            .limit(query.take)
            .skip(query.skip).toArray();
        const result = entities.map(data => {
            return plainToInstance(this._constructor, data);
        });
        return result;
    }
    async create(entity: TEntity): Promise<void> {
        await this._collection.insertOne(entity as OptionalUnlessRequiredId<TEntity>);
    }
    async update(filter: Filter<TEntity>, entity: TEntity): Promise<void> {
        await this._collection.updateOne(filter, entity);
    }
    async delete(filter: Filter<TEntity>): Promise<void> {
        await this._collection.deleteOne(filter);
    }

}
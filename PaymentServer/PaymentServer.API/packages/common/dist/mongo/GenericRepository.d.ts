import { Db } from "mongodb";
import { IGenericRepository } from "./IGenericRepository";
import { Filter, Query } from "./IRepository";
export declare class GenericRepository<TEntity extends object> implements IGenericRepository<TEntity> {
    private readonly _collection;
    private readonly _constructor;
    constructor(constructor: {
        new (...args: any[]): TEntity;
    }, db: Db, name: string);
    findById(filter: Filter<TEntity>): Promise<TEntity | null>;
    find(filter: Filter<TEntity>, query: Query): Promise<TEntity[] | null>;
    create(entity: TEntity): Promise<void>;
    update(filter: Filter<TEntity>, entity: TEntity): Promise<void>;
    delete(filter: Filter<TEntity>): Promise<void>;
}

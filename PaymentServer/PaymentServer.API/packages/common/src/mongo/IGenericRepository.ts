import { Filter, Query } from "./IRepository";

export interface IGenericRepository<TEntity> {
    find(filter: Filter<TEntity>, query: Query): Promise<TEntity[] | null>;
    findById(filter: Filter<TEntity>): Promise<TEntity | null>;
    create(entity: TEntity): Promise<void>;
    update(filter: Filter<TEntity>, entity: TEntity): Promise<void>;
    delete(filter: Filter<TEntity>): Promise<void>;
}
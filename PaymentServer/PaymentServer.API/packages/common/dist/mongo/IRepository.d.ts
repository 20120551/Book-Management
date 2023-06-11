import { Filter as MongoFilter } from "mongodb";
import { AggregationRoot } from "../domain/AggregationRoot";
export type Query = {
    take: number;
    skip: number;
};
export type Filter<Type> = {
    [x in keyof Type]?: Type[x];
} & MongoFilter<Type>;
export interface IRepository<TEntity extends AggregationRoot> {
    findById(id: string): Promise<TEntity | null>;
    create(entity: TEntity, version: number): Promise<void>;
    delete(entity: TEntity): Promise<void>;
}

import { IQuery } from "./IQuery";

export interface IQueryBus {
    execute<TResult>(query: IQuery<TResult>): Promise<TResult | undefined>;
}
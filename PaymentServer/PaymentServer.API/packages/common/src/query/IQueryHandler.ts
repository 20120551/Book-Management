import { IQuery } from "./IQuery";

export interface IQueryHandler<TQuery extends IQuery<TResult>, TResult> {
    query: string;
    execute(query: TQuery): Promise<TResult>;
}
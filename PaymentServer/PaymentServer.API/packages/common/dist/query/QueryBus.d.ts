import { IQuery } from "./IQuery";
import { IQueryBus } from "./IQueryBus";
import { Container } from "inversify";
export declare class QueryBus implements IQueryBus {
    private readonly _container;
    constructor(container: Container);
    execute<TResult>(query: IQuery<TResult>): Promise<TResult | undefined>;
}

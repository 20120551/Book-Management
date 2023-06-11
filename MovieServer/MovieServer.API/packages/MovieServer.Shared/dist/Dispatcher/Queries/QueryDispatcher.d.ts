import { IQuery } from "../../Queries";
import { Container } from "inversify";
import IQueryDispatcher from "./IQueryDispatcher";
export default class QueryDispatcher implements IQueryDispatcher {
    private readonly _container;
    constructor(container: Container);
    ExecuteAsync<TResult>(query: IQuery<TResult>): Promise<TResult | null>;
}

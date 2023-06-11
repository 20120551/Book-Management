import { Injectable, InversifyContainer } from "../../IoC";
import { GetSymbol } from "../../IoC/Utils";
import { IQuery, IQueryHandler } from "../../Queries";
import { Container } from "inversify";
import IQueryDispatcher from "./IQueryDispatcher";

@Injectable
export default class QueryDispatcher implements IQueryDispatcher {
    private readonly _container: Container;
    constructor(
        @InversifyContainer container: Container
    ) {
        this._container = container;

        this.ExecuteAsync = this.ExecuteAsync.bind(this);
    }
    ExecuteAsync<TResult>(query: IQuery<TResult>): Promise<TResult | null> {
        console.log(`Dispatcher: IQueryHandler<${query.constructor.name}>`);
        const symbol = GetSymbol(`IQueryHandler<${query.constructor.name}>`);
        const handler = this._container.get<IQueryHandler<IQuery<TResult>, TResult>>(symbol as symbol);
        return handler.HandleAsync(query);
    }

}
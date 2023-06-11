import { ContainerModule, Injectable, TYPES } from "../ioc";
import { IQuery } from "./IQuery";
import { IQueryBus } from "./IQueryBus";
import { Container } from "inversify";
import { IQueryHandler } from "./IQueryHandler";

@Injectable
export class QueryBus implements IQueryBus {
    private readonly _container: Container;
    constructor(
        @ContainerModule container: Container
    ) {
        this._container = container;
    }
    execute<TResult>(query: IQuery<TResult>): Promise<TResult | undefined> {
        const handlers = this._container.getAll<IQueryHandler<IQuery<TResult>, TResult>>(TYPES.IQueryHandlerModule);
        const handler = handlers.find(handler => handler.query === query.constructor.name);
        if (!handler) {
            return Promise.resolve(handler);
        }
        return handler.execute(query);
    }

}
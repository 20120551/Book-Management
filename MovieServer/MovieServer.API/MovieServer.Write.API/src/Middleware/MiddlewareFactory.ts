import { IMiddlewareFactory } from "@Shared/Middleware";
import { Container } from "@Shared/Lib/inversify";
import { container } from "../Bootstrap";


class MiddlewareFactory implements IMiddlewareFactory {
    constructor(public _container: Container) {
    }
    Create<T>(Type: new (container: Container) => T): T {
        return new Type(this._container);
    }
}

const middlewareFactory = new MiddlewareFactory(container);
export default middlewareFactory;
import { } from "@movie/application";
import { } from "@movie/domain";
import { IMiddlewareFactory } from "@movie/shared";
import { } from "@movie/infrastructure";
import { container } from "../Bootstrap";
import { Container } from "inversify";


class MiddlewareFactory implements IMiddlewareFactory {
    constructor(public _container: Container) {
    }
    Create<T>(Type: new (container: Container) => T): T {
        return new Type(this._container);
    }
}

const middlewareFactory = new MiddlewareFactory(container);
export default middlewareFactory;
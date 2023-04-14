import { IMiddlewareFactory } from "@Shared/Middleware";
import { Container } from "@Shared/Lib/inversify";
declare class MiddlewareFactory implements IMiddlewareFactory {
    _container: Container;
    constructor(_container: Container);
    Create<T>(Type: new (container: Container) => T): T;
}
declare const middlewareFactory: MiddlewareFactory;
export default middlewareFactory;
//# sourceMappingURL=MiddlewareFactory.d.ts.map
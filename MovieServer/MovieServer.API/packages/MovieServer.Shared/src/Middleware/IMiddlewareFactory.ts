import { Container } from "inversify";

export default interface IMiddlewareFactory {
    Create<T>(type: new (container: Container) => T): T;
}
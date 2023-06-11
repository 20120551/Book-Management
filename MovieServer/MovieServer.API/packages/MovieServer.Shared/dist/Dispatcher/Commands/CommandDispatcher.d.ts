import { ICommand } from "../../Commands";
import ICommandDispatcher from "../Commands/ICommandDispatcher";
import { Container } from "inversify";
export default class CommandDispatcher implements ICommandDispatcher {
    private readonly _container;
    constructor(container: Container);
    DispatchAsync<TCommand extends ICommand>(command: TCommand): Promise<any>;
}

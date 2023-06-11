import { ICommand } from "../../Commands";
export default interface ICommandDispatcher {
    DispatchAsync<TCommand extends ICommand>(command: TCommand): Promise<any>;
}

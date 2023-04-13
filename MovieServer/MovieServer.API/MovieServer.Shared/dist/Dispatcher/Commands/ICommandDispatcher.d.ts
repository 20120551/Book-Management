import { ICommand } from "@Shared/Commands";
export default interface ICommandDispatcher {
    DispatchAsync<TCommand extends ICommand>(command: TCommand): Promise<any>;
}

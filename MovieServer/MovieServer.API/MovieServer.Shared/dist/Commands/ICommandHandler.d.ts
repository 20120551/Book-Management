import { ICommand } from "@Shared/Commands";
export default interface ICommandHandler<TRequest extends ICommand> {
    HandleAsync(command: TRequest): Promise<any>;
}

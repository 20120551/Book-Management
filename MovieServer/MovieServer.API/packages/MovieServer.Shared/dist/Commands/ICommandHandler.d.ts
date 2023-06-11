import ICommand from "./ICommand";
export default interface ICommandHandler<TRequest extends ICommand> {
    HandleAsync(command: TRequest): Promise<any>;
}

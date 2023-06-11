import { ICommand } from "./ICommand";
import { ICommandHandler } from "./ICommandHandler";

export interface ICommandBus<TCommand extends ICommand = ICommand> {
    RegisterHandler(handler: ICommandHandler<TCommand>): void;
    Send(command: TCommand): Promise<void>;
}
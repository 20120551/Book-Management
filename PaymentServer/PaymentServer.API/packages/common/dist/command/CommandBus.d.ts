import { ICommand } from "./ICommand";
import { ICommandBus } from "./ICommandBus";
import { ICommandHandler } from "./ICommandHandler";
export declare class CommandBus<TCommand extends ICommand = ICommand> implements ICommandBus<TCommand> {
    private _handlers;
    RegisterHandler(handler: ICommandHandler<TCommand>): void;
    Send(command: TCommand): Promise<void>;
}

import { Injectable } from "../ioc";
import { ICommand } from "./ICommand";
import { ICommandBus } from "./ICommandBus";
import { ICommandHandler } from "./ICommandHandler";

@Injectable
export class CommandBus<TCommand extends ICommand = ICommand> implements ICommandBus<TCommand>
{
    private _handlers: Map<string, ICommandHandler<TCommand>> = new Map();

    RegisterHandler(handler: ICommandHandler<TCommand>): void {
        if (this._handlers.has(handler.command)) {
            // throw exception here
            throw new Error("");
        }

        this._handlers.set(handler.command, handler);
    }
    Send(command: TCommand): Promise<void> {
        const handler = this._handlers.get(command.constructor.name);
        if (!handler) {
            throw new Error(`the handler was not exist with the command '${command.constructor.name}'`);
        }

        return handler.Handle(command);
    }

}
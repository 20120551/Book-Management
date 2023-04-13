import { ICommand, ICommandHandler } from "@Shared/Commands";
import ICommandDispatcher from "../Commands/ICommandDispatcher";
import { Injectable, InversifyContainer } from "@Shared/IoC";
import { Container } from "inversify";
import { GetSymbol } from "@Shared/IoC/Utils";

@Injectable
export default class CommandDispatcher implements ICommandDispatcher {

    private readonly _container: Container;
    constructor(
        @InversifyContainer container: Container
    ) {
        this._container = container;

        this.DispatchAsync = this.DispatchAsync.bind(this);
    }
    DispatchAsync<TCommand extends ICommand>(command: TCommand): Promise<any> {
        // get command handler based on TCommand
        console.log(`Commander: ICommandHandler<${command.constructor.name}>`);
        const symbol = GetSymbol(`ICommandHandler<${command.constructor.name}>`)
        const handler = this._container.get<ICommandHandler<TCommand>>(symbol as symbol);
        // handle command
        return handler.HandleAsync(command);
    }

}
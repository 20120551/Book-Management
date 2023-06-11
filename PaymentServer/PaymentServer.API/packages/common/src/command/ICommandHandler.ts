import { ICommand } from "./ICommand";

export interface ICommandHandler<TCommand extends ICommand> {
    command: string;
    Handle(command: TCommand): Promise<void>;
}
import { ICommand } from "@movie/shared";
export default class RemoveActorFromMovie implements ICommand {
    Id: string;
    ActorId: string;
    /**
     *
     */
    constructor(Id: string, ActorId: string);
}

import { ICommand } from "@Shared/Commands";

export default class RemoveActorFromMovie implements ICommand {
    /**
     *
     */
    constructor(
        public Id: string,
        public ActorId: string,
    ) {

    }
}
import { ICommand } from "@movie/shared";

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
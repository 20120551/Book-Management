import { ICommand } from "@movie/shared";

export default class AddActorToMovie implements ICommand {
    /**
     *
     */

    // add default actor id here
    constructor(
        public Id: string,
        public Name: string,
        public Role: string
    ) {

    }
}
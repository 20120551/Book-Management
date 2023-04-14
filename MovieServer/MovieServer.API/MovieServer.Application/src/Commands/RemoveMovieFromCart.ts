import { ICommand } from "@Shared/Commands";

export default class RemoveMovieFromCart implements ICommand {
    /**
     *
     */
    constructor(
        public Id: string,
        public MovieId: string,
    ) {

    }
}
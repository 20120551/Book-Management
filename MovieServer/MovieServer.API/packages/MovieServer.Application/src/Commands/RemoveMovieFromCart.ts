import { ICommand } from "@movie/shared";

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
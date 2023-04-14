import { ICommand } from "@Shared/Commands";

export default class UpdateMovieFromCart implements ICommand {
    /**
     *
     */

    // add default actor id here
    constructor(
        public Id: string,
        public MovieId: string,
        public Quantity: number,
        public Seat: string
    ) {

    }
}
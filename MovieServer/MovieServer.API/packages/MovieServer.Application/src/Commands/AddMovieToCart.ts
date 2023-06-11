import { ICommand } from "@movie/shared";
export default class AddMovieToCart implements ICommand {
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
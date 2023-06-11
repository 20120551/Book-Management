import { ICommand } from "@movie/shared";
export default class UpdateMovieFromCart implements ICommand {
    Id: string;
    MovieId: string;
    Quantity: number;
    Seat: string;
    /**
     *
     */
    constructor(Id: string, MovieId: string, Quantity: number, Seat: string);
}

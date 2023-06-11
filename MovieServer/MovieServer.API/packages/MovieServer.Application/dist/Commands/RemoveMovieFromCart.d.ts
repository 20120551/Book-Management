import { ICommand } from "@movie/shared";
export default class RemoveMovieFromCart implements ICommand {
    Id: string;
    MovieId: string;
    /**
     *
     */
    constructor(Id: string, MovieId: string);
}

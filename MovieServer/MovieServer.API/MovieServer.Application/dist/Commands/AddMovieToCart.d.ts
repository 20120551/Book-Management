import { ICommand } from "@Shared/Commands";
export default class AddMovieToCart implements ICommand {
    Id: string;
    MovieId: string;
    Quantity: number;
    Seat: string;
    /**
     *
     */
    constructor(Id: string, MovieId: string, Quantity: number, Seat: string);
}
//# sourceMappingURL=AddMovieToCart.d.ts.map
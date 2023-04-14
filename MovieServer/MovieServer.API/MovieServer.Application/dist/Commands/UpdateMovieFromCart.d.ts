import { ICommand } from "@Shared/Commands";
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
//# sourceMappingURL=UpdateMovieFromCart.d.ts.map
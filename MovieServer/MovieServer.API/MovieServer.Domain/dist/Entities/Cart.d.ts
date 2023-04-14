import { CartId, MovieId, Quantity, Seat } from "@Domain/ValueObjects";
import { Aggregation } from "@Shared/Domain";
import MovieItem from "../ValueObjects/MovieItem";
export default class Cart extends Aggregation {
    Id: CartId;
    static TIME_TO_LEAVE: number;
    MovieItems: MovieItem[];
    constructor(Id: CartId);
    GetItem(id: MovieId): MovieItem;
    Add(movieItem: MovieItem): void;
    Adds(movieItems: MovieItem[]): void;
    Update(movieItem: MovieItem): void;
    Remove(movieId: MovieId): void;
    ChangeQuantity(id: MovieId, quantity: Quantity): void;
    ChangeSeat(id: MovieId, seat: Seat): void;
}
//# sourceMappingURL=Cart.d.ts.map
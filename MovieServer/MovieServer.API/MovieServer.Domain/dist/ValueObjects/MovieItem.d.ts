import { MovieId, MovieName, MoviePrice, Quantity, Seat } from "@Domain/ValueObjects";
import { Aggregation } from "@Shared/Domain";
export default class MovieItem extends Aggregation {
    Id: MovieId;
    Name: MovieName;
    Price: MoviePrice;
    Quantity: Quantity;
    Seat: Seat;
    constructor(Id: MovieId, Name: MovieName, Price: MoviePrice, Quantity: Quantity, Seat: Seat);
    IncreaseQuantity(quantity: Quantity): void;
    DecreaseQuantity(quantity: Quantity): void;
    ChangeQuantity(quantity: Quantity): void;
    ChangeSeat(seat: Seat): void;
}
//# sourceMappingURL=MovieItem.d.ts.map
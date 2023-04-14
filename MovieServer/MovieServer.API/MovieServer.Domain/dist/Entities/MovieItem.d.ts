import { MovieItemId, Quantity, Seat } from "@Domain/ValueObjects";
import { Aggregation } from "@Shared/Domain";
export default class MovieItem extends Aggregation {
    Id: MovieItemId;
    Quantity: Quantity;
    Seat: Seat;
    constructor(Id: MovieItemId, Quantity: Quantity, Seat: Seat);
    IncreaseQuantity(quantity: Quantity): void;
    DecreaseQuantity(quantity: Quantity): void;
    ChangeQuantity(quantity: Quantity): void;
    ChangeSeat(seat: Seat): void;
}
//# sourceMappingURL=MovieItem.d.ts.map
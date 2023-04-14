import { MovieId, MovieName, MoviePrice, Quantity, Seat } from "@Domain/ValueObjects";
import { Aggregation } from "@Shared/Domain";

export default class MovieItem extends Aggregation {
    // movie Id
    // check
    constructor(
        public Id: MovieId,
        public Name: MovieName,
        public Price: MoviePrice,
        public Quantity: Quantity,
        public Seat: Seat) {
        super();
    }

    // method
    IncreaseQuantity(quantity: Quantity): void {
        this.Quantity.Increase(quantity.Value);
    }

    DecreaseQuantity(quantity: Quantity): void {
        this.Quantity.Decrease(quantity.Value);
    }
    ChangeQuantity(quantity: Quantity): void {
        this.Quantity.Change(quantity.Value);
    }
    ChangeSeat(seat: Seat): void {
        this.Seat.Change(seat.Value);
    }
}
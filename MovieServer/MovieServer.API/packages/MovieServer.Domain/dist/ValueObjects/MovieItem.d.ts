import { MovieId, MovieName, MoviePrice, Quantity, Seat } from "../ValueObjects";
import { Aggregation } from "@movie/shared";
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

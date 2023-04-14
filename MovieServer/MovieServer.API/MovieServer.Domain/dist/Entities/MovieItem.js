"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Domain_1 = require("@Shared/Domain");
class MovieItem extends Domain_1.Aggregation {
    // movie Id
    // check
    constructor(Id, Quantity, Seat) {
        super();
        this.Id = Id;
        this.Quantity = Quantity;
        this.Seat = Seat;
    }
    // method
    IncreaseQuantity(quantity) {
        this.Quantity.Increase(quantity.Value);
    }
    DecreaseQuantity(quantity) {
        this.Quantity.Decrease(quantity.Value);
    }
    ChangeQuantity(quantity) {
        this.Quantity.Change(quantity.Value);
    }
    ChangeSeat(seat) {
        this.Seat.Change(seat.Value);
    }
}
exports.default = MovieItem;

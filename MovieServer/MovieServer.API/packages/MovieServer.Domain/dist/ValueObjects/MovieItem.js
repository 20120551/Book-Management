"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
class MovieItem extends shared_1.Aggregation {
    // movie Id
    // check
    constructor(Id, Name, Price, Quantity, Seat) {
        super();
        this.Id = Id;
        this.Name = Name;
        this.Price = Price;
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Domain/Exceptions");
class Quantity {
    constructor(quantity) {
        if (quantity < 0) {
            throw new Exceptions_1.InvalidQuantityException(quantity);
        }
        this.Value = quantity;
    }
    Increase(quantity) {
        this.Value += quantity;
    }
    Decrease(quantity) {
        const temp = this.Value - quantity;
        if (temp < 0) {
            throw new Exceptions_1.InvalidQuantityException(temp);
        }
        this.Value = temp;
    }
    Change(quantity) {
        if (quantity < 0) {
            throw new Exceptions_1.InvalidQuantityException(quantity);
        }
        this.Value = quantity;
    }
    static Create(quantity) { return new Quantity(quantity); }
}
exports.default = Quantity;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
class InvalidQuantityException extends shared_1.MovieException {
    constructor(quantity) {
        super(`Quantity must greater than 0 but now is ${quantity}`);
        this.quantity = quantity;
    }
}
exports.default = InvalidQuantityException;

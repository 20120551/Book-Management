"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
class InvalidQuantityException extends Exceptions_1.MovieException {
    constructor(quantity) {
        super(`Quantity must greater than 0 but now is ${quantity}`);
        this.quantity = quantity;
    }
}
exports.default = InvalidQuantityException;

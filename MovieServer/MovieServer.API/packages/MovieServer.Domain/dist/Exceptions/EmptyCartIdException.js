"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
class EmptyCartIdException extends shared_1.MovieException {
    constructor() {
        super('cartId can\'t not be empty');
    }
}
exports.default = EmptyCartIdException;

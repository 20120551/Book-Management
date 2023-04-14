"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
class EmptyCartIdException extends Exceptions_1.MovieException {
    constructor() {
        super('cartId can\'t not be empty');
    }
}
exports.default = EmptyCartIdException;

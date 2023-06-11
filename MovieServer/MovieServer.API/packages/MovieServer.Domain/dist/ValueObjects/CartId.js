"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class CartId {
    constructor(id) {
        if (id === "") {
            throw new Exceptions_1.EmptyCartIdException();
        }
        this.Guid = id;
    }
    static Create(id) { return new CartId(id); }
}
exports.default = CartId;

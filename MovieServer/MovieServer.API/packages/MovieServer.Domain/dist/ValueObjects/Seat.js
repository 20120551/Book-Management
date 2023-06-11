"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class Seat {
    constructor(seat) {
        if (seat === "") {
            throw new Exceptions_1.EmptySeatException();
        }
        this.Value = seat;
    }
    Change(seat) {
        if (seat === "") {
            throw new Exceptions_1.EmptySeatException();
        }
        this.Value = seat;
    }
    static Create(seat) { return new Seat(seat); }
}
exports.default = Seat;

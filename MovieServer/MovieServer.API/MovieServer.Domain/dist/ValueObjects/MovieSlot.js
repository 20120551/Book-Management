"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Domain/Exceptions");
class MovieSlot {
    /**
     * constructor
     */
    constructor(slot) {
        if (slot < 0 && slot > MovieSlot.MAX_SLOT) {
            throw new Exceptions_1.MovieSlotIsNotInRangeException(slot);
        }
        this.Slot = slot;
    }
    // implicit
    static Create(slot) {
        return new MovieSlot(slot);
    }
}
exports.default = MovieSlot;
MovieSlot.MAX_SLOT = 100;

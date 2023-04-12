"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MovieSlot_1 = __importDefault(require("@Domain/ValueObjects/MovieSlot"));
const Exceptions_1 = require("@Shared/Exceptions");
class MovieSlotIsNotInRangeException extends Exceptions_1.MovieException {
    /**
     * constructor
     */
    constructor(slot) {
        super(`${slot} is not in range of 0 to ${MovieSlot_1.default.MAX_SLOT}`);
    }
}
exports.default = MovieSlotIsNotInRangeException;

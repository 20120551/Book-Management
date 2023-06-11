"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MovieSlot_1 = __importDefault(require("../ValueObjects/MovieSlot"));
const shared_1 = require("@movie/shared");
class MovieSlotIsNotInRangeException extends shared_1.MovieException {
    /**
     * constructor
     */
    constructor(slot) {
        super(`${slot} is not in range of 0 to ${MovieSlot_1.default.MAX_SLOT}`);
    }
}
exports.default = MovieSlotIsNotInRangeException;

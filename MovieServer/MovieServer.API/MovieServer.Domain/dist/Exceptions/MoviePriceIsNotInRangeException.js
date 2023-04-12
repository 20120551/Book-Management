"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MoviePrice_1 = __importDefault(require("@Domain/ValueObjects/MoviePrice"));
const Exceptions_1 = require("@Shared/Exceptions");
class MoviePriceIsNotInRangeException extends Exceptions_1.MovieException {
    /**
     *
     */
    constructor(price) {
        super(`${price} is not in range of 0 to ${MoviePrice_1.default.MAX_PRICE}`);
        this.price = price;
    }
}
exports.default = MoviePriceIsNotInRangeException;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Domain/Exceptions");
class MoviePrice {
    /**
     * constructor
     */
    constructor(price) {
        if (price < 0 || price > MoviePrice.MAX_PRICE) {
            throw new Exceptions_1.MoviePriceIsNotInRangeException(price);
        }
        this.Price = price;
    }
    // implicit
    static Create(price) {
        return new MoviePrice(price);
    }
}
exports.default = MoviePrice;
MoviePrice.MAX_PRICE = 1000000;

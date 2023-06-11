"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
class MovieNameRequiredException extends shared_1.MovieException {
    /**
     * constructor
     */
    constructor() {
        super("Movie name is required");
    }
}
exports.default = MovieNameRequiredException;

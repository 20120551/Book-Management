"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
class MovieIdRequiredException extends shared_1.MovieException {
    /**
     * constructor
     */
    constructor() {
        super("Movie id is required");
    }
}
exports.default = MovieIdRequiredException;

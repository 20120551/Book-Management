"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
class NotFoundMovieItemException extends shared_1.MovieException {
    /**
     *
     */
    constructor(movieId) {
        super(`Not found movie item with id ${movieId.Guid}`);
        this.movieId = movieId;
    }
}
exports.default = NotFoundMovieItemException;

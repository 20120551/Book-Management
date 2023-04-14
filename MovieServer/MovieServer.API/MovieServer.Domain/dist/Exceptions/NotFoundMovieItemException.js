"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
class NotFoundMovieItemException extends Exceptions_1.MovieException {
    /**
     *
     */
    constructor(movieId) {
        super(`Not found movie item with id ${movieId.Guid}`);
        this.movieId = movieId;
    }
}
exports.default = NotFoundMovieItemException;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
class EmptyMovieItemIdException extends Exceptions_1.MovieException {
    constructor() {
        super("MovieItem Id can't not be empty");
    }
}
exports.default = EmptyMovieItemIdException;

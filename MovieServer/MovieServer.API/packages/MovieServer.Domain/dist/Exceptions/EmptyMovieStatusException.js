"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
class EmptyMovieStatusException extends shared_1.MovieException {
    /**
     *
     */
    constructor() {
        super("Movie status is required");
    }
}
exports.default = EmptyMovieStatusException;

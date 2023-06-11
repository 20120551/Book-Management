"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
class NotFoundMovieException extends shared_1.MovieException {
    constructor() {
        super("Movie was not found");
    }
}
exports.default = NotFoundMovieException;

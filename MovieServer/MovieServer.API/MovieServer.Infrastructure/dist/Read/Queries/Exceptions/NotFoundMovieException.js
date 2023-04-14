"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
class NotFoundMovieException extends Exceptions_1.MovieException {
    constructor() {
        super("Movie was not found");
    }
}
exports.default = NotFoundMovieException;

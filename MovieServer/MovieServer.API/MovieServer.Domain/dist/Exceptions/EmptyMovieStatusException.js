"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
class EmptyMovieStatusException extends Exceptions_1.MovieException {
    /**
     *
     */
    constructor() {
        super("Movie status is required");
    }
}
exports.default = EmptyMovieStatusException;

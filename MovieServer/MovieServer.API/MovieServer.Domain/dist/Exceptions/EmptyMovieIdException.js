"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
class MovieIdRequiredException extends Exceptions_1.MovieException {
    /**
     * constructor
     */
    constructor() {
        super("Movie id is required");
    }
}
exports.default = MovieIdRequiredException;

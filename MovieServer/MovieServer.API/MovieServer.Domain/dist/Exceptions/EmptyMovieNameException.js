"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
class MovieNameRequiredException extends Exceptions_1.MovieException {
    /**
     * constructor
     */
    constructor() {
        super("Movie name is required");
    }
}
exports.default = MovieNameRequiredException;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MovieException extends Error {
    /**
     * constructor
     */
    constructor(message) {
        super(message);
    }
}
exports.default = MovieException;

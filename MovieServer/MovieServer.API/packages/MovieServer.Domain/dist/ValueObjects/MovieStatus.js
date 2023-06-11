"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class MovieStatus {
    /**
     * constructor
     */
    constructor(status) {
        if (status === "") {
            throw new Exceptions_1.EmptyMovieStatusException();
        }
        this.Status = status;
    }
    // implicit
    static Create(status) {
        return new MovieStatus(status);
    }
}
exports.default = MovieStatus;

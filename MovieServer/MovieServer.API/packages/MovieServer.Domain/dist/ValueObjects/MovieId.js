"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class MovieId {
    /**
     * constructor
     */
    constructor(id) {
        if (id === "") {
            // throw exception
            throw new Exceptions_1.EmptyMovieIdException();
        }
        this.Guid = id;
    }
    Compare(id) {
        return id === this.Guid;
    }
    // implicit
    static Create(id) {
        return new MovieId(id);
    }
}
exports.default = MovieId;

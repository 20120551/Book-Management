"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class MovieName {
    /**
     *
     */
    constructor(name) {
        if (name == "") {
            throw new Exceptions_1.EmptyMovieNameException();
        }
        this.Name = name;
    }
    // implicit
    static Create(name) {
        return new MovieName(name);
    }
}
exports.default = MovieName;

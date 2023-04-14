"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Domain/Exceptions");
class MovieItemId {
    constructor(id) {
        if (id === "") {
            throw new Exceptions_1.EmptyMovieIdException();
        }
        this.Guid = id;
    }
}
exports.default = MovieItemId;

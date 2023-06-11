"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
class EmptyActorNameException extends shared_1.MovieException {
    /**
     *  constructor
     */
    constructor() {
        super("Actor name is required");
    }
}
exports.default = EmptyActorNameException;

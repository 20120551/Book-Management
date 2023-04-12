"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
class EmptyActorNameException extends Exceptions_1.MovieException {
    /**
     *  constructor
     */
    constructor() {
        super("Actor name is required");
    }
}
exports.default = EmptyActorNameException;

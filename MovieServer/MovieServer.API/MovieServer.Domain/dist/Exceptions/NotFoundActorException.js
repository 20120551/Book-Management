"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
class NotFoundActorException extends Exceptions_1.MovieException {
    /**
     *
     */
    constructor(name) {
        super(`Not found actor with name ${name}`);
        this.name = name;
    }
}
exports.default = NotFoundActorException;

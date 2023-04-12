"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
class ActorAlreadyExistException extends Exceptions_1.MovieException {
    /**
     * constructor
     */
    constructor(actor) {
        super(`actor ${actor.Name} act as ${actor.Role} already exists`);
        this.actor = actor;
    }
}
exports.default = ActorAlreadyExistException;

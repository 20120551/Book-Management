"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
class ActorAlreadyExistException extends shared_1.MovieException {
    /**
     * constructor
     */
    constructor(actor) {
        super(`actor ${actor.Name} act as ${actor.Role} already exists`);
        this.actor = actor;
    }
}
exports.default = ActorAlreadyExistException;

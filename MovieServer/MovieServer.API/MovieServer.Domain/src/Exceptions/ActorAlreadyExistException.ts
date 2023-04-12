import { Actor } from "@Domain/ValueObjects";
import { MovieException } from "@Shared/Exceptions";

export default class ActorAlreadyExistException extends MovieException {
    /**
     * constructor
     */
    constructor(
        public actor: Actor
    ) {
        super(`actor ${actor.Name} act as ${actor.Role} already exists`);
    }
}
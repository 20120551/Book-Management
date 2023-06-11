import { Actor } from "../ValueObjects";
import { MovieException } from "@movie/shared";

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
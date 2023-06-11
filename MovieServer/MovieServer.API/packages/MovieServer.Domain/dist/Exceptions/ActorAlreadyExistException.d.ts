import { Actor } from "../ValueObjects";
import { MovieException } from "@movie/shared";
export default class ActorAlreadyExistException extends MovieException {
    actor: Actor;
    /**
     * constructor
     */
    constructor(actor: Actor);
}

import { Actor } from "@Domain/ValueObjects";
import { MovieException } from "@Shared/Exceptions";
export default class ActorAlreadyExistException extends MovieException {
    actor: Actor;
    /**
     * constructor
     */
    constructor(actor: Actor);
}
//# sourceMappingURL=ActorAlreadyExistException.d.ts.map
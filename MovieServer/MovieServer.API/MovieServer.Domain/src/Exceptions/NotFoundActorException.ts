import { MovieException } from "@Shared/Exceptions";

export default class NotFoundActorException extends MovieException {
    /**
     *
     */
    constructor(
        public name: string
    ) {
        super(`Not found actor with name ${name}`);

    }
}
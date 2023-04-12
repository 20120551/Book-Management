import { MovieException } from "@Shared/Exceptions";

export default class NotFoundActorException extends MovieException {
    constructor() {
        super('Not found actor');

    }
}
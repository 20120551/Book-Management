import { MovieException } from "@movie/shared";

export default class NotFoundActorException extends MovieException {
    constructor() {
        super('Not found actor');

    }
}
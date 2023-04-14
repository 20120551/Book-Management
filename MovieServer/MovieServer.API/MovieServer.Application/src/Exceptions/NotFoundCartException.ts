import { MovieException } from "@Shared/Exceptions";

export default class NotFoundCartException extends MovieException {
    constructor() {
        super('Not found Cart');

    }
}
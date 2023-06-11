import { MovieException } from "@movie/shared";

export default class NotFoundCartException extends MovieException {
    constructor() {
        super('Not found Cart');

    }
}
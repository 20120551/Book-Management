import { MovieException } from "@Shared/Exceptions";

export default class EmptyCartIdException extends MovieException {
    constructor() {
        super('cartId can\'t not be empty');

    }
}
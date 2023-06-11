
import { MovieException } from "@movie/shared";
export default class EmptyCartIdException extends MovieException {
    constructor() {
        super('cartId can\'t not be empty');

    }
}
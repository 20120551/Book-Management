import { MovieException } from "@movie/shared";
export default class InvalidQuantityException extends MovieException {
    quantity: number;
    constructor(quantity: number);
}

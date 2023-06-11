import { MovieException } from "@movie/shared";
export default class MoviePriceIsNotInRangeException extends MovieException {
    price: number;
    /**
     *
     */
    constructor(price: number);
}

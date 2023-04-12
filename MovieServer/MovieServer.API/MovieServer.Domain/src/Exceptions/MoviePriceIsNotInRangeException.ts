import MoviePrice from "@Domain/ValueObjects/MoviePrice";
import { MovieException } from "@Shared/Exceptions"

export default class MoviePriceIsNotInRangeException extends MovieException {
    /**
     *
     */
    constructor(
        public price: number
    ) {
        super(`${price} is not in range of 0 to ${MoviePrice.MAX_PRICE}`);

    }
}
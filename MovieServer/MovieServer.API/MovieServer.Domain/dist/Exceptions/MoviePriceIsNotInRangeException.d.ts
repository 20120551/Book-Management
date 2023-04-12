import { MovieException } from "@Shared/Exceptions";
export default class MoviePriceIsNotInRangeException extends MovieException {
    price: number;
    /**
     *
     */
    constructor(price: number);
}
//# sourceMappingURL=MoviePriceIsNotInRangeException.d.ts.map
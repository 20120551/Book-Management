import { MovieException } from "@movie/shared";
export default class MovieSlotIsNotInRangeException extends MovieException {
    /**
     * constructor
     */
    constructor(slot: number);
}

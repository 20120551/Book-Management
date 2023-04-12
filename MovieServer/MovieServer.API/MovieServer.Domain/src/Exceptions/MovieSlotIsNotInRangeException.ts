import MovieSlot from "@Domain/ValueObjects/MovieSlot";
import { MovieException } from "@Shared/Exceptions";

export default class MovieSlotIsNotInRangeException extends MovieException {
    /**
     * constructor
     */
    constructor(slot: number) {
        super(`${slot} is not in range of 0 to ${MovieSlot.MAX_SLOT}`);

    }
}
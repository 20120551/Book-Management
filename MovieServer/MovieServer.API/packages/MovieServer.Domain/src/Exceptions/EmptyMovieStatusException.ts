
import { MovieException } from "@movie/shared";
export default class EmptyMovieStatusException extends MovieException {
    /**
     *
     */
    constructor() {
        super("Movie status is required");
    }
}
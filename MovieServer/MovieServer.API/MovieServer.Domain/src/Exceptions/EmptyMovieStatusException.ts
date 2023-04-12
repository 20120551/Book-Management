import { MovieException } from "@Shared/Exceptions";

export default class EmptyMovieStatusException extends MovieException {
    /**
     *
     */
    constructor() {
        super("Movie status is required");
    }
}
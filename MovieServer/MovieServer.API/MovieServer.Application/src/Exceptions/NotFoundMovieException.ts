import { MovieException } from "@Shared/Exceptions";

export default class NotFoundMovieException extends MovieException {
    /**
     * constructor
     */
    constructor() {
        super("Movie was not found");
    }
}
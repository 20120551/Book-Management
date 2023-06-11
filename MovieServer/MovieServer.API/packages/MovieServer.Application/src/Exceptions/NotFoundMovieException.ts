import { MovieException } from "@movie/shared";

export default class NotFoundMovieException extends MovieException {
    /**
     * constructor
     */
    constructor() {
        super("Movie was not found");
    }
}
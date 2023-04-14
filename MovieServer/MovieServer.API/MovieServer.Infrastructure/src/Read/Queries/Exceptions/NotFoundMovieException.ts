import { MovieException } from "@Shared/Exceptions";

export default class NotFoundMovieException extends MovieException {
    constructor() {
        super("Movie was not found");

    }
}
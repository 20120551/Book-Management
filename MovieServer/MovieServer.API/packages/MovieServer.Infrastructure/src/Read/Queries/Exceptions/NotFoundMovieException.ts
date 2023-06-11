import { MovieException } from "@movie/shared";

export default class NotFoundMovieException extends MovieException {
    constructor() {
        super("Movie was not found");

    }
}
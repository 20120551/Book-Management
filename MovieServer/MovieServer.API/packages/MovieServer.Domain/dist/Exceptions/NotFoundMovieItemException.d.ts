import { MovieId } from "../ValueObjects";
import { MovieException } from "@movie/shared";
export default class NotFoundMovieItemException extends MovieException {
    movieId: MovieId;
    /**
     *
     */
    constructor(movieId: MovieId);
}

import { MovieId } from "../ValueObjects";
import { MovieException } from "@movie/shared";
export default class NotFoundMovieItemException
    extends MovieException {
    /**
     *
     */
    constructor(public movieId: MovieId) {
        super(`Not found movie item with id ${movieId.Guid}`);
    }
}
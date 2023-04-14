import { MovieId } from "@Domain/ValueObjects";
import { MovieException } from "@Shared/Exceptions";

export default class NotFoundMovieItemException
    extends MovieException {
    /**
     *
     */
    constructor(public movieId: MovieId) {
        super(`Not found movie item with id ${movieId.Guid}`);
    }
}
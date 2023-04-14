import { MovieId } from "@Domain/ValueObjects";
import { MovieException } from "@Shared/Exceptions";
export default class NotFoundMovieItemException extends MovieException {
    movieId: MovieId;
    /**
     *
     */
    constructor(movieId: MovieId);
}
//# sourceMappingURL=NotFoundMovieItemException.d.ts.map
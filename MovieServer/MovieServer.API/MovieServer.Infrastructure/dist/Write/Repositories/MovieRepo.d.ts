import { Movie } from "@Domain/Entities";
import { IMovieRepo } from "@Domain/Repositories";
import { MovieId } from "@Domain/ValueObjects";
import { DbClient } from "./DbClient";
export default class MovieRepo implements IMovieRepo {
    private _movieModel;
    constructor(dbClient: DbClient);
    Get(id: MovieId): Promise<Movie | null>;
    Update(movie: Movie): Promise<void>;
    Create(movie: Movie): Promise<Movie>;
    Remove(movie: Movie): Promise<void>;
}
//# sourceMappingURL=MovieRepo.d.ts.map
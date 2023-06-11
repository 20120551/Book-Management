import { IMovieRepo, Movie, MovieId } from "@movie/domain";
import { DbClientWriteSide } from "./DbClient";
export default class MovieRepo implements IMovieRepo {
    private _movieModel;
    constructor(dbClient: DbClientWriteSide);
    Get(id: MovieId): Promise<Movie | null>;
    Update(movie: Movie): Promise<void>;
    Create(movie: Movie): Promise<Movie>;
    Remove(movie: Movie): Promise<void>;
}

import { Movie } from "../Entities";
import { MovieId } from "../ValueObjects";

export default interface IMovieRepo {
    Get(id: MovieId): Promise<Movie | null>;
    Update(movie: Movie): Promise<void>;
    Create(movie: Movie): Promise<Movie>;
    Remove(movie: Movie): Promise<void>;
}
import { EmptyMovieIdException } from "@Domain/Exceptions";

export default class MovieId {
    public Guid: string;
    /**
     * constructor
     */
    private constructor(id: string) {
        if (id === "") {
            // throw exception
            throw new EmptyMovieIdException();
        }
        this.Guid = id;
    }

    public Compare(id: string): boolean {
        return id === this.Guid;
    }

    // implicit
    public static Create(id: string): MovieId {
        return new MovieId(id);
    }
}
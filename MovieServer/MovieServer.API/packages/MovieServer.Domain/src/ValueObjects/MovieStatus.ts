import { EmptyMovieStatusException } from "../Exceptions";

export default class MovieStatus {
    public Status: string;
    /**
     * constructor
     */
    private constructor(status: string) {
        if (status === "") {
            throw new EmptyMovieStatusException();
        }
        this.Status = status;
    }

    // implicit
    public static Create(status: string): MovieStatus {
        return new MovieStatus(status);
    }
}
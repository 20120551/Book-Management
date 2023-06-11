import { EmptyMovieNameException } from "../Exceptions";

export default class MovieName {
    public Name: string;
    /**
     *
     */
    private constructor(name: string) {
        if (name == "") {
            throw new EmptyMovieNameException();
        }
        this.Name = name;
    }

    // implicit
    public static Create(name: string): MovieName {
        return new MovieName(name);
    }
}
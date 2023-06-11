
import { MovieException } from "@movie/shared";
export default class MovieIdRequiredException extends MovieException {
    /**
     * constructor
     */
    constructor() {
        super("Movie id is required");
    }
}
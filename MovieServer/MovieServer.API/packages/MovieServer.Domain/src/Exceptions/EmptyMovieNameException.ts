
import { MovieException } from "@movie/shared";
export default class MovieNameRequiredException extends MovieException {
    /**
     * constructor
     */
    constructor() {
        super("Movie name is required");

    }
}
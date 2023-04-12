import { MovieException } from "@Shared/Exceptions";

export default class MovieNameRequiredException extends MovieException {
    /**
     * constructor
     */
    constructor() {
        super("Movie name is required");

    }
}
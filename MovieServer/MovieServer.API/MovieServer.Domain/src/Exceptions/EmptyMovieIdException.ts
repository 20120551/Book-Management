import { MovieException } from '@Shared/Exceptions';

export default class MovieIdRequiredException extends MovieException {
    /**
     * constructor
     */
    constructor() {
        super("Movie id is required");
    }
}
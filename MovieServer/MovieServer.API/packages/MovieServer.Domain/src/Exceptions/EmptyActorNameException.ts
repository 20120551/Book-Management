
import { MovieException } from "@movie/shared";
export default class EmptyActorNameException extends MovieException {
    /**
     *  constructor
     */
    constructor() {
        super("Actor name is required");

    }
}
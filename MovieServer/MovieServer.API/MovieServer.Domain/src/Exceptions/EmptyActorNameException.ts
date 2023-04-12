import { MovieException } from "@Shared/Exceptions";

export default class EmptyActorNameException extends MovieException {
    /**
     *  constructor
     */
    constructor() {
        super("Actor name is required");

    }
}
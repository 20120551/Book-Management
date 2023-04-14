import { MovieException } from "@Shared/Exceptions";

export default class EmptySeatException extends MovieException {
    constructor() {
        super("seat can't not be empty");

    }
}
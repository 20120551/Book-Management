
import { MovieException } from "@movie/shared";
export default class EmptySeatException extends MovieException {
    constructor() {
        super("seat can't not be empty");

    }
}
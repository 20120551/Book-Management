
import { MovieException } from "@movie/shared";
export default class NotFoundActorException extends MovieException {
    /**
     *
     */
    constructor(
        public name: string
    ) {
        super(`Not found actor with name ${name}`);

    }
}
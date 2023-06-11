import { MovieException } from "@movie/shared";
export default class NotFoundActorException extends MovieException {
    name: string;
    /**
     *
     */
    constructor(name: string);
}

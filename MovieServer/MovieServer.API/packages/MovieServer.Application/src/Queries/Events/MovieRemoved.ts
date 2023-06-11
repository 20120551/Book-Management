import { IQuery } from "@movie/shared";

export default class MovieRemoved implements IQuery<void> {
    constructor(
        public Id: string
    ) {
    }
}
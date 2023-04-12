import { IQuery } from "@Shared/Queries";

export default class MovieRemoved implements IQuery<void> {
    constructor(
        public Id: string
    ) {
    }
}
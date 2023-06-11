import { IQuery } from "@movie/shared";

export default class ActorRemoved implements IQuery<void> {
    constructor(
        public Id: string,
        public ActorId: number,
    ) {
    }
}
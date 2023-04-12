import { IQuery } from "@Shared/Queries";

export default class ActorRemoved implements IQuery<void> {
    constructor(
        public Id: string,
        public ActorId: number,
    ) {
    }
}
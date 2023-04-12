import { IQuery } from "@Shared/Queries";

export default class ActorAdded implements IQuery<void> {
    constructor(
        public Id: string,
        public ActorId: number,
        public Name: string,
        public Role: string
    ) {
    }
}
import { IQuery } from "@movie/shared";
export default class ActorRemoved implements IQuery<void> {
    Id: string;
    ActorId: number;
    constructor(Id: string, ActorId: number);
}

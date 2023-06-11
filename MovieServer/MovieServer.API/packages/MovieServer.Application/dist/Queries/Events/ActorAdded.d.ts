import { IQuery } from "@movie/shared";
export default class ActorAdded implements IQuery<void> {
    Id: string;
    ActorId: number;
    Name: string;
    Role: string;
    constructor(Id: string, ActorId: number, Name: string, Role: string);
}

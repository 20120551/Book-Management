import { IQuery } from "@Shared/Queries";
export default class ActorAdded implements IQuery<void> {
    Id: string;
    ActorId: number;
    Name: string;
    Role: string;
    constructor(Id: string, ActorId: number, Name: string, Role: string);
}
//# sourceMappingURL=ActorAdded.d.ts.map
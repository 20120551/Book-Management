import { Movie } from "@Domain/Entities";
import { IActorRepo } from "@Domain/Repositories";
import { Actor } from "@Domain/ValueObjects";
import { DbClient } from "./DbClient";
export default class ActorRepo implements IActorRepo {
    private _actorModel;
    constructor(dbClient: DbClient);
    Get(id: number): Promise<Actor | null>;
    Create(actor: Actor, movie: Movie): Promise<any>;
    Delete(id: number): Promise<void>;
}
//# sourceMappingURL=ActorRepo.d.ts.map
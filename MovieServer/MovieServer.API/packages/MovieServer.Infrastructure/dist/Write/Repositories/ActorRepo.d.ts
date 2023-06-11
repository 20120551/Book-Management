import { Actor, IActorRepo, Movie } from "@movie/domain";
import { DbClientWriteSide } from "./DbClient";
export default class ActorRepo implements IActorRepo {
    private _actorModel;
    constructor(dbClient: DbClientWriteSide);
    Get(id: number): Promise<Actor | null>;
    Create(actor: Actor, movie: Movie): Promise<any>;
    Delete(id: number): Promise<void>;
}

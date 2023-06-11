import { Movie } from "../Entities";
import { Actor } from "../ValueObjects";
export default interface IActorRepo {
    Get(id: number): Promise<Actor | null>;
    Create(actor: Actor, movie: Movie): Promise<any>;
    Delete(id: number): Promise<void>;
}

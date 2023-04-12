import { Movie } from "@Domain/Entities";
import { Actor } from "@Domain/ValueObjects";

export default interface IActorRepo {
    Get(id: number): Promise<Actor | null>;
    Create(actor: Actor, movie: Movie): Promise<any>;
    Delete(id: number): Promise<void>;
}
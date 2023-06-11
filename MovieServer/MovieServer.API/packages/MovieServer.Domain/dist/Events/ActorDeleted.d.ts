import { Movie } from "../Entities";
import { Actor } from "../ValueObjects";
import { IDomainEvent } from "@movie/shared";
export default class ActorDeleted implements IDomainEvent {
    movie: Movie;
    actor: Actor;
    constructor(movie: Movie, actor: Actor);
}

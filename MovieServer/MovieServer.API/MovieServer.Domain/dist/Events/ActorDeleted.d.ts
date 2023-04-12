import { Movie } from "@Domain/Entities";
import { Actor } from "@Domain/ValueObjects";
import { IDomainEvent } from "@Shared/Domain";
export default class ActorDeleted implements IDomainEvent {
    movie: Movie;
    actor: Actor;
    constructor(movie: Movie, actor: Actor);
}
//# sourceMappingURL=ActorDeleted.d.ts.map
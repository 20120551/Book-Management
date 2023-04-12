import { Movie } from "@Domain/Entities";
import { Actor } from "@Domain/ValueObjects";
import { IDomainEvent } from "@Shared/Domain";
export default class ActorAdded implements IDomainEvent {
    movie: Movie;
    actor: Actor;
    constructor(movie: Movie, actor: Actor);
}
//# sourceMappingURL=ActorAdded.d.ts.map
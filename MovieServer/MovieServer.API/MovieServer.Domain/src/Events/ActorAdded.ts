import { Movie } from "@Domain/Entities";
import { Actor } from "@Domain/ValueObjects";
import { IDomainEvent } from "@Shared/Domain";

export default class ActorAdded implements IDomainEvent {
    constructor(
        public movie: Movie,
        public actor: Actor
    ) {

    }
}
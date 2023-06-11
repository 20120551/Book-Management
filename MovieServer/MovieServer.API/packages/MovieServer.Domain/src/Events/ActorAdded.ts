import { Movie } from "../Entities";
import { Actor } from "../ValueObjects";
import { IDomainEvent } from "@movie/shared";

export default class ActorAdded implements IDomainEvent {
    constructor(
        public movie: Movie,
        public actor: Actor
    ) {

    }
}
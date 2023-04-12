import { Localization, MovieId, MovieName, MoviePrice, Actor, MovieSlot, MovieStatus } from "@Domain/ValueObjects";
import { Aggregation } from "@Shared/Domain";
export default class Movie extends Aggregation {
    Id: MovieId;
    Name: MovieName;
    Status: MovieStatus;
    Slot: MovieSlot;
    Price: MoviePrice;
    Localization: Localization;
    Actors: Actor[];
    /**
     * constructor
     */
    constructor(Id: MovieId, Name: MovieName, Status: MovieStatus, Slot: MovieSlot, Price: MoviePrice, Localization: Localization);
    GetActor(name: string): Actor[];
    AddActor(actor: Actor): void;
    AddActors(actors: Actor[]): void;
    RemoveActor(actor: Actor): void;
}
//# sourceMappingURL=Movie.d.ts.map
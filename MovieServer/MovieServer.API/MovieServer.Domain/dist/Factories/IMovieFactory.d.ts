import { Movie } from "@Domain/Entities";
import { Actor, Localization, MovieId, MovieName, MoviePrice, MovieSlot, MovieStatus } from "@Domain/ValueObjects";
export declare type MovieFactoryType = {
    Id: MovieId;
    Status: MovieStatus;
    Price: MoviePrice;
    Name: MovieName;
    Slot: MovieSlot;
    Localization: Localization;
    Actors?: Actor[];
};
export default interface IMovieFactory {
    Create({ Id, Status, Price, Slot, Name, Actors, Localization }: MovieFactoryType): Movie;
}
//# sourceMappingURL=IMovieFactory.d.ts.map
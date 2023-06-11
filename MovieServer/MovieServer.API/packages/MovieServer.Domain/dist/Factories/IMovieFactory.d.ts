import { Movie } from "../Entities";
import { Actor, Localization, MovieId, MovieName, MoviePrice, MovieSlot, MovieStatus } from "../ValueObjects";
export type MovieFactoryType = {
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

import { Movie } from "../Entities";
import { IMovieFactory } from "../Factories";
import { MovieFactoryType } from "./IMovieFactory";
export default class MovieFactory implements IMovieFactory {
    Create({ Id, Slot, Price, Name, Actors, Localization, Status }: MovieFactoryType): Movie;
}

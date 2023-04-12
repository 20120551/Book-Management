import { Movie } from "@Domain/Entities";
import { IMovieFactory } from "@Domain/Factories";
import { MovieFactoryType } from "./IMovieFactory";
export default class MovieFactory implements IMovieFactory {
    Create({ Id, Slot, Price, Name, Actors, Localization, Status }: MovieFactoryType): Movie;
}
//# sourceMappingURL=MovieFactory.d.ts.map
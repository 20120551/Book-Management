import { createMap, forMember, mapFrom } from "@automapper/core";
import { CreateMovie, UpdateMovie } from "../Commands";
import { Movie, MovieId, MovieSlot, Localization, MoviePrice, MovieName, MovieStatus } from "@movie/domain";
import { AutoMapper } from "@movie/shared";


export default class MovieProfile {
    public static CreateMap(mapper: AutoMapper): void {
        createMap(mapper, CreateMovie, Movie,
            forMember(
                dest => dest.Id,
                mapFrom(src => MovieId.Create(src.Id))
            ),
            forMember(
                dest => dest.Slot,
                mapFrom(src => MovieSlot.Create(src.Slot))
            ),
            forMember(
                dest => dest.Localization,
                mapFrom(src => Localization.Create(src.Localization.District, src.Localization.City))
            ),
            forMember(
                dest => dest.Price,
                mapFrom(src => MoviePrice.Create(src.Price))
            ),
            forMember(
                dest => dest.Name,
                mapFrom(src => MovieName.Create(src.Name))
            ),
            forMember(
                dest => dest.Status,
                mapFrom(src => MovieStatus.Create(src.Status))
            ));

        createMap(mapper, UpdateMovie, Movie,
            forMember(
                dest => dest.Id,
                mapFrom(src => MovieId.Create(src.Id))
            ),
            forMember(
                dest => dest.Slot,
                mapFrom(src => MovieSlot.Create(src.Slot))
            ),
            forMember(
                dest => dest.Localization,
                mapFrom(src => Localization.Create(src.Localization.District, src.Localization.City))
            ),
            forMember(
                dest => dest.Price,
                mapFrom(src => MoviePrice.Create(src.Price))
            ),
            forMember(
                dest => dest.Name,
                mapFrom(src => MovieName.Create(src.Name))
            ),
            forMember(
                dest => dest.Status,
                mapFrom(src => MovieStatus.Create(src.Status))
            ));

        // createMap(mapper, RemoveMovie, Movie,
        //     forMember(
        //         dest => dest.Id,
        //         mapFrom(src => MovieId.Create(src.Id))
        //     ));
    }
}
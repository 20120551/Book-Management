import { createMap, forMember, mapFrom } from "@Shared/Lib/@automapper/core";
import { CreateMovie, RemoveMovie, UpdateMovie } from "@Application/Commands";
import { Movie } from "@Domain/Entities";
import { MovieId, MovieSlot, Localization, MoviePrice, MovieName, MovieStatus } from "@Domain/ValueObjects";
import { AutoMapper } from "@Shared/AutoMapper";
import { MovieReadDto } from "@Application/DTO";


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

        createMap(mapper, RemoveMovie, Movie,
            forMember(
                dest => dest.Id,
                mapFrom(src => MovieId.Create(src.Id))
            ));

        createMap(mapper, Movie, MovieReadDto,
            forMember(
                dest => dest.Id,
                mapFrom(src => src.Id.Guid)
            ),
            forMember(
                dest => dest.Name,
                mapFrom(src => src.Name.Name)
            ),
            forMember(
                dest => dest.Status,
                mapFrom(src => src.Status.Status)
            ),
            forMember(
                dest => dest.Slot,
                mapFrom(src => src.Slot.Slot)
            ),
            forMember(
                dest => dest.Price,
                mapFrom(src => src.Price.Price)
            ),
            forMember(
                dest => dest.Localization,
                mapFrom(src => src.Localization)
            ),
            forMember(
                dest => dest.Actors,
                mapFrom(src => src.Actors)
            ));
    }
}
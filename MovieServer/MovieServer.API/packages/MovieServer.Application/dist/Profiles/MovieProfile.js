"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@automapper/core");
const Commands_1 = require("../Commands");
const domain_1 = require("@movie/domain");
class MovieProfile {
    static CreateMap(mapper) {
        (0, core_1.createMap)(mapper, Commands_1.CreateMovie, domain_1.Movie, (0, core_1.forMember)(dest => dest.Id, (0, core_1.mapFrom)(src => domain_1.MovieId.Create(src.Id))), (0, core_1.forMember)(dest => dest.Slot, (0, core_1.mapFrom)(src => domain_1.MovieSlot.Create(src.Slot))), (0, core_1.forMember)(dest => dest.Localization, (0, core_1.mapFrom)(src => domain_1.Localization.Create(src.Localization.District, src.Localization.City))), (0, core_1.forMember)(dest => dest.Price, (0, core_1.mapFrom)(src => domain_1.MoviePrice.Create(src.Price))), (0, core_1.forMember)(dest => dest.Name, (0, core_1.mapFrom)(src => domain_1.MovieName.Create(src.Name))), (0, core_1.forMember)(dest => dest.Status, (0, core_1.mapFrom)(src => domain_1.MovieStatus.Create(src.Status))));
        (0, core_1.createMap)(mapper, Commands_1.UpdateMovie, domain_1.Movie, (0, core_1.forMember)(dest => dest.Id, (0, core_1.mapFrom)(src => domain_1.MovieId.Create(src.Id))), (0, core_1.forMember)(dest => dest.Slot, (0, core_1.mapFrom)(src => domain_1.MovieSlot.Create(src.Slot))), (0, core_1.forMember)(dest => dest.Localization, (0, core_1.mapFrom)(src => domain_1.Localization.Create(src.Localization.District, src.Localization.City))), (0, core_1.forMember)(dest => dest.Price, (0, core_1.mapFrom)(src => domain_1.MoviePrice.Create(src.Price))), (0, core_1.forMember)(dest => dest.Name, (0, core_1.mapFrom)(src => domain_1.MovieName.Create(src.Name))), (0, core_1.forMember)(dest => dest.Status, (0, core_1.mapFrom)(src => domain_1.MovieStatus.Create(src.Status))));
        // createMap(mapper, RemoveMovie, Movie,
        //     forMember(
        //         dest => dest.Id,
        //         mapFrom(src => MovieId.Create(src.Id))
        //     ));
    }
}
exports.default = MovieProfile;

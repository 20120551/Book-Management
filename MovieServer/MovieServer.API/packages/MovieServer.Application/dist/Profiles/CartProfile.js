"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@automapper/core");
const Commands_1 = require("../Commands");
const domain_1 = require("@movie/domain");
const DTO_1 = require("../DTO");
class CartProfile {
    static CreateMap(mapper) {
        (0, core_1.createMap)(mapper, Commands_1.CreateCart, domain_1.Cart, (0, core_1.forMember)(dest => dest.Id, (0, core_1.mapFrom)(src => domain_1.CartId.Create(src.Id))));
        // createMap(mapper, RemoveCart, Cart,
        //     forMember(
        //         dest => dest.Id,
        //         mapFrom(src => CartId.Create(src.Id))
        //     ))
        (0, core_1.createMap)(mapper, domain_1.Cart, DTO_1.CartReadDto, (0, core_1.forMember)(dest => dest.Id, (0, core_1.mapFrom)(src => src.Id.Guid)), (0, core_1.forMember)(dest => dest.Receiver, (0, core_1.mapFrom)(src => src.Receiver)), (0, core_1.forMember)(dest => dest.MovieItems, (0, core_1.mapFrom)(src => src.MovieItems.map(item => {
            const { Name, Price, Id, Seat, Quantity } = item;
            return {
                Name: Name.Name,
                Price: Price.Price,
                Id: Id.Guid,
                Seat: Seat.Value,
                Quantity: Quantity.Value
            };
        }))));
        (0, core_1.createMap)(mapper, DTO_1.CartReadDto, domain_1.Cart, (0, core_1.forMember)(dest => dest.Id, (0, core_1.mapFrom)(src => domain_1.CartId.Create(src.Id))), (0, core_1.forMember)(dest => dest.Receiver, (0, core_1.mapFrom)(src => src.Receiver)), (0, core_1.forMember)(dest => dest.MovieItems, (0, core_1.mapFrom)(src => src.MovieItems.map(item => {
            const { Name, Price, Id, Seat: seat, Quantity: quantity } = item;
            return {
                Name: domain_1.MovieName.Create(Name),
                Price: domain_1.MoviePrice.Create(Price),
                Id: domain_1.MovieId.Create(Id),
                Seat: domain_1.Seat.Create(seat),
                Quantity: domain_1.Quantity.Create(quantity)
            };
        }))));
    }
}
exports.default = CartProfile;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@Shared/Lib/@automapper/core");
const Commands_1 = require("@Application/Commands");
const Entities_1 = require("@Domain/Entities");
const ValueObjects_1 = require("@Domain/ValueObjects");
const DTO_1 = require("@Application/DTO");
class CartProfile {
    static CreateMap(mapper) {
        (0, core_1.createMap)(mapper, Commands_1.CreateCart, Entities_1.Cart, (0, core_1.forMember)(dest => dest.Id, (0, core_1.mapFrom)(src => ValueObjects_1.CartId.Create(src.Id))));
        // createMap(mapper, RemoveCart, Cart,
        //     forMember(
        //         dest => dest.Id,
        //         mapFrom(src => CartId.Create(src.Id))
        //     ))
        (0, core_1.createMap)(mapper, Entities_1.Cart, DTO_1.CartReadDto, (0, core_1.forMember)(dest => dest.Id, (0, core_1.mapFrom)(src => src.Id.Guid)), (0, core_1.forMember)(dest => dest.MovieItems, (0, core_1.mapFrom)(src => src.MovieItems.map(item => {
            const { Name, Price, Id, Seat, Quantity } = item;
            return {
                Name: Name.Name,
                Price: Price.Price,
                Id: Id.Guid,
                Seat: Seat.Value,
                Quantity: Quantity.Value
            };
        }))));
        (0, core_1.createMap)(mapper, DTO_1.CartReadDto, Entities_1.Cart, (0, core_1.forMember)(dest => dest.Id, (0, core_1.mapFrom)(src => ValueObjects_1.CartId.Create(src.Id))), (0, core_1.forMember)(dest => dest.MovieItems, (0, core_1.mapFrom)(src => src.MovieItems.map(item => {
            const { Name, Price, Id, Seat: seat, Quantity: quantity } = item;
            return {
                Name: ValueObjects_1.MovieName.Create(Name),
                Price: ValueObjects_1.MoviePrice.Create(Price),
                Id: ValueObjects_1.MovieId.Create(Id),
                Seat: ValueObjects_1.Seat.Create(seat),
                Quantity: ValueObjects_1.Quantity.Create(quantity)
            };
        }))));
    }
}
exports.default = CartProfile;

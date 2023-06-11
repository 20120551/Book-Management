import { createMap, forMember, mapFrom } from "@automapper/core";
import { CreateCart } from "../Commands";
import { AutoMapper } from "@movie/shared";
import { Cart, CartId, MovieId, MovieName, MoviePrice, Quantity, Seat } from "@movie/domain";
import { CartReadDto } from "../DTO";


export default class CartProfile {
    public static CreateMap(mapper: AutoMapper): void {
        createMap(mapper, CreateCart, Cart,
            forMember(
                dest => dest.Id,
                mapFrom(src => CartId.Create(src.Id))
            ))

        // createMap(mapper, RemoveCart, Cart,
        //     forMember(
        //         dest => dest.Id,
        //         mapFrom(src => CartId.Create(src.Id))
        //     ))

        createMap(mapper, Cart, CartReadDto,
            forMember(
                dest => dest.Id,
                mapFrom(src => src.Id.Guid)
            ),
            forMember(
                dest => dest.Receiver,
                mapFrom(src => src.Receiver)
            ),
            forMember(
                dest => dest.MovieItems,
                mapFrom(src => src.MovieItems.map(item => {
                    const { Name, Price, Id, Seat, Quantity } = item;
                    return {
                        Name: Name.Name,
                        Price: Price.Price,
                        Id: Id.Guid,
                        Seat: Seat.Value,
                        Quantity: Quantity.Value
                    }
                }))
            ))

        createMap(mapper, CartReadDto, Cart,
            forMember(
                dest => dest.Id,
                mapFrom(src => CartId.Create(src.Id))
            ),
            forMember(
                dest => dest.Receiver,
                mapFrom(src => src.Receiver)
            ),
            forMember(
                dest => dest.MovieItems,
                mapFrom(src => src.MovieItems.map(item => {
                    const { Name, Price, Id, Seat: seat, Quantity: quantity } = item;
                    return {
                        Name: MovieName.Create(Name),
                        Price: MoviePrice.Create(Price),
                        Id: MovieId.Create(Id),
                        Seat: Seat.Create(seat),
                        Quantity: Quantity.Create(quantity)
                    }
                }))
            ))
    }
}
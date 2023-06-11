import { Cart } from "../Entities";
import { MovieItem } from "../ValueObjects";
import { Injectable } from "@movie/shared";
import ICartFactory, { CartFactoryType, MovieItemFactoryType } from "./ICartFactory";

@Injectable
export default class CartFactory implements ICartFactory {
    CreateMovieItem({ Id, Name, Quantity, Price, Seat }: MovieItemFactoryType): MovieItem {
        return new MovieItem(Id, Name, Price, Quantity, Seat);
    }
    Create({ Id, MovieItem }: CartFactoryType): Cart {
        const cart = new Cart(Id);
        if (MovieItem !== undefined) {
            cart.Adds(MovieItem);
        }
        return cart;
    }

}
import { Cart } from "../Entities";
import { MovieItem } from "../ValueObjects";
import ICartFactory, { CartFactoryType, MovieItemFactoryType } from "./ICartFactory";
export default class CartFactory implements ICartFactory {
    CreateMovieItem({ Id, Name, Quantity, Price, Seat }: MovieItemFactoryType): MovieItem;
    Create({ Id, MovieItem }: CartFactoryType): Cart;
}

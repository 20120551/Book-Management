import { Cart } from "@Domain/Entities";
import { MovieItem } from "@Domain/ValueObjects";
import ICartFactory, { CartFactoryType, MovieItemFactoryType } from "./ICartFactory";
export default class CartFactory implements ICartFactory {
    CreateMovieItem({ Id, Name, Quantity, Price, Seat }: MovieItemFactoryType): MovieItem;
    Create({ Id, MovieItem }: CartFactoryType): Cart;
}
//# sourceMappingURL=CartFactory.d.ts.map
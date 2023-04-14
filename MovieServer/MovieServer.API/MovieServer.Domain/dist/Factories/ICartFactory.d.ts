import { Cart } from "@Domain/Entities";
import { CartId, MovieId, MovieItem, MovieName, MoviePrice, Quantity, Seat } from "@Domain/ValueObjects";
export declare type CartFactoryType = {
    Id: CartId;
    MovieItem: MovieItem[];
};
export declare type MovieItemFactoryType = {
    Id: MovieId;
    Name: MovieName;
    Quantity: Quantity;
    Price: MoviePrice;
    Seat: Seat;
};
export default interface IMovieFactory {
    Create({ Id, MovieItem }: CartFactoryType): Cart;
    CreateMovieItem({ Id, Name, Quantity, Price, Seat }: MovieItemFactoryType): MovieItem;
}
//# sourceMappingURL=ICartFactory.d.ts.map
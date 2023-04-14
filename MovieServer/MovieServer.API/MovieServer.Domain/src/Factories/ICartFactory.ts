import { Cart } from "@Domain/Entities"
import { CartId, MovieId, MovieItem, MovieName, MoviePrice, Quantity, Seat } from "@Domain/ValueObjects";
export type CartFactoryType = {
    Id: CartId
    MovieItem: MovieItem[]
};

export type MovieItemFactoryType = {
    Id: MovieId,
    Name: MovieName,
    Quantity: Quantity,
    Price: MoviePrice,
    Seat: Seat
}
export default interface IMovieFactory {
    Create(
        { Id, MovieItem }: CartFactoryType): Cart;
    CreateMovieItem({
        Id, Name, Quantity, Price, Seat
    }: MovieItemFactoryType): MovieItem;
}
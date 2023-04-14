import { NotFoundMovieItemException } from "@Domain/Exceptions";
import { CartId, MovieId, Quantity, Seat } from "@Domain/ValueObjects";
import { Aggregation } from "@Shared/Domain";
import MovieItem from "../ValueObjects/MovieItem";

export default class Cart extends Aggregation {
    public static TIME_TO_LEAVE = 24 * 60 * 60;
    public MovieItems: MovieItem[] = [];

    constructor(public Id: CartId) {
        super();
    }

    // get item
    public GetItem(id: MovieId): MovieItem {
        const item = this.MovieItems.find(item => item.Id.Guid === id.Guid);
        if (item === undefined) {
            throw new NotFoundMovieItemException(id);
        }
        return item;
    }

    // add item
    public Add(movieItem: MovieItem): void {
        const item = this.MovieItems.find(item => item.Id.Guid === movieItem.Id.Guid);
        // founded --> increase quantity
        if (item === undefined) {
            //add
            this.MovieItems.push(movieItem);
            return;
        }
        return item.IncreaseQuantity(movieItem.Quantity);
    }

    public Adds(movieItems: MovieItem[]): void {
        for (var item of movieItems) {
            this.Add(item);
        }
    }

    public Update(movieItem: MovieItem): void {
        const item = this.MovieItems.find(item => item.Id.Guid === movieItem.Id.Guid);
        if (item === undefined) {
            throw new NotFoundMovieItemException(movieItem.Id);
        }
        item.Name = movieItem.Name;
        item.Price = movieItem.Price;
        item.Quantity = movieItem.Quantity;
        item.Seat = movieItem.Seat;
    }

    // remove item
    public Remove(movieId: MovieId): void {
        const index = this.MovieItems.findIndex(item => item.Id.Guid === movieId.Guid);
        if (index === -1) {
            throw new NotFoundMovieItemException(movieId);
        }
        this.MovieItems.splice(index, 1);
    }

    // change quantity
    public ChangeQuantity(id: MovieId, quantity: Quantity): void {
        const item = this.MovieItems.find(item => item.Id.Guid === id.Guid);
        if (item === undefined) {
            throw new NotFoundMovieItemException(id);
        }
        item.ChangeQuantity(quantity);
    }
    // change seat
    public ChangeSeat(id: MovieId, seat: Seat): void {
        const item = this.MovieItems.find(item => item.Id.Guid === id.Guid);
        if (item === undefined) {
            throw new NotFoundMovieItemException(id);
        }
        item.ChangeSeat(seat);
    }
}
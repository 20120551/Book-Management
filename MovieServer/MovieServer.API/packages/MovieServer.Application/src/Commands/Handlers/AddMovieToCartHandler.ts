import { CartFactory, CartRepo, ICommandHandler, Injectable, MovieRepo } from "@movie/shared";
import { AddMovieToCart } from "../../Commands";
import { NotFoundCartException, NotFoundMovieException } from "../../Exceptions";
import { CartId, ICartFactory, ICartRepo, IMovieRepo, MovieId, Quantity, Seat } from "@movie/domain";

export type IAddMovieToCartHandler = ICommandHandler<AddMovieToCart>;
@Injectable
export default class AddMovieToCartHandler implements IAddMovieToCartHandler {

    private readonly _movieRepo: IMovieRepo;
    private readonly _cartRepo: ICartRepo;
    private readonly _cartFactory: ICartFactory;

    constructor(
        @MovieRepo movieRepo: IMovieRepo,
        @CartRepo cartRepo: ICartRepo,
        @CartFactory cartFactory: ICartFactory,
    ) {
        this._movieRepo = movieRepo;
        this._cartRepo = cartRepo;
        this._cartFactory = cartFactory;
    }
    //automapper -> CartId, MovieItem
    async HandleAsync(command: AddMovieToCart): Promise<any> {
        const { Id, MovieId: movieId, Quantity: quantity, Seat: seat } = command;
        const movie = await this._movieRepo.Get(MovieId.Create(movieId));
        if (movie === null) {
            throw new NotFoundMovieException();
        }

        const cart = await this._cartRepo.Get(CartId.Create(Id));
        if (cart === null) {
            throw new NotFoundCartException();
        }
        const { Name, Price } = movie;
        const movieItem = this._cartFactory.CreateMovieItem({
            Id: MovieId.Create(movieId),
            Name,
            Price,
            Quantity: Quantity.Create(quantity),
            Seat: Seat.Create(seat)
        })
        cart.Add(movieItem);
        await this._cartRepo.Update(cart);
    }
}
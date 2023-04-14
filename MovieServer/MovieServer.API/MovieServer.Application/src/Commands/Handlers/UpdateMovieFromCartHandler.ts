import { ICommandHandler } from "@Shared/Commands";
import { UpdateMovieFromCart } from "@Application/Commands";
import { CartFactory, CartRepo, Injectable, MovieRepo } from "@Shared/IoC";
import { ICartRepo, IMovieRepo } from "@Domain/Repositories";
import { ICartFactory } from "@Domain/Factories";
import { CartId, MovieId, Quantity, Seat } from "@Domain/ValueObjects";
import { NotFoundCartException, NotFoundMovieException } from "@Application/Exceptions";

export type IUpdateMovieFromCartHandler = ICommandHandler<UpdateMovieFromCart>;
@Injectable
export default class UpdateMovieFromCartHandler implements IUpdateMovieFromCartHandler {
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

    async HandleAsync(command: UpdateMovieFromCart): Promise<any> {
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
        cart.Update(movieItem);
        await this._cartRepo.Update(cart);
    }
}
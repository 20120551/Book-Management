import { ICommandHandler } from "@Shared/Commands";
import { RemoveMovieFromCart } from "@Application/Commands";
import { CartFactory, CartRepo, Injectable, MovieRepo } from "@Shared/IoC";
import { ICartRepo, IMovieRepo } from "@Domain/Repositories";
import { ICartFactory } from "@Domain/Factories";
import { CartId, MovieId, Quantity, Seat } from "@Domain/ValueObjects";
import { NotFoundCartException, NotFoundMovieException } from "@Application/Exceptions";

export type IRemoveMovieFromCartHandler = ICommandHandler<RemoveMovieFromCart>;
@Injectable
export default class RemoveMovieFromCartHandler implements IRemoveMovieFromCartHandler {
    private readonly _cartRepo: ICartRepo;

    constructor(
        @CartRepo cartRepo: ICartRepo,
    ) {
        this._cartRepo = cartRepo;
    }
    async HandleAsync(command: RemoveMovieFromCart): Promise<any> {
        const { Id, MovieId: movieId } = command;

        const cart = await this._cartRepo.Get(CartId.Create(Id));
        if (cart === null) {
            throw new NotFoundCartException();
        }

        cart.Remove(MovieId.Create(movieId));
        await this._cartRepo.Update(cart);
    }
}
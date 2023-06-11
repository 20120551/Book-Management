
import { CartRepo, ICommandHandler, Injectable } from "@movie/shared";
import { CartId, ICartRepo, MovieId } from "@movie/domain";
import RemoveMovieFromCart from "../RemoveMovieFromCart";
import { NotFoundCartException } from "../../Exceptions";

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
import { ICommandHandler } from "@movie/shared";
import { ICartRepo } from "@movie/domain";
import RemoveMovieFromCart from "../RemoveMovieFromCart";
export type IRemoveMovieFromCartHandler = ICommandHandler<RemoveMovieFromCart>;
export default class RemoveMovieFromCartHandler implements IRemoveMovieFromCartHandler {
    private readonly _cartRepo;
    constructor(cartRepo: ICartRepo);
    HandleAsync(command: RemoveMovieFromCart): Promise<any>;
}

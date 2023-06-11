import { ICommandHandler } from "@movie/shared";
import { ICartFactory, ICartRepo, IMovieRepo } from "@movie/domain";
import UpdateMovieFromCart from "../UpdateMovieFromCart";
export type IUpdateMovieFromCartHandler = ICommandHandler<UpdateMovieFromCart>;
export default class UpdateMovieFromCartHandler implements IUpdateMovieFromCartHandler {
    private readonly _movieRepo;
    private readonly _cartRepo;
    private readonly _cartFactory;
    constructor(movieRepo: IMovieRepo, cartRepo: ICartRepo, cartFactory: ICartFactory);
    HandleAsync(command: UpdateMovieFromCart): Promise<any>;
}

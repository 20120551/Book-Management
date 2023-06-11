import { ICommandHandler } from "@movie/shared";
import { AddMovieToCart } from "../../Commands";
import { ICartFactory, ICartRepo, IMovieRepo } from "@movie/domain";
export type IAddMovieToCartHandler = ICommandHandler<AddMovieToCart>;
export default class AddMovieToCartHandler implements IAddMovieToCartHandler {
    private readonly _movieRepo;
    private readonly _cartRepo;
    private readonly _cartFactory;
    constructor(movieRepo: IMovieRepo, cartRepo: ICartRepo, cartFactory: ICartFactory);
    HandleAsync(command: AddMovieToCart): Promise<any>;
}

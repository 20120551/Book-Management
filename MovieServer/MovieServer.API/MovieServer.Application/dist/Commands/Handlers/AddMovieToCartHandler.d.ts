import { ICommandHandler } from "@Shared/Commands";
import { AddMovieToCart } from "@Application/Commands";
import { ICartRepo, IMovieRepo } from "@Domain/Repositories";
import { ICartFactory } from "@Domain/Factories";
export declare type IAddMovieToCartHandler = ICommandHandler<AddMovieToCart>;
export default class AddMovieToCartHandler implements IAddMovieToCartHandler {
    private readonly _movieRepo;
    private readonly _cartRepo;
    private readonly _cartFactory;
    constructor(movieRepo: IMovieRepo, cartRepo: ICartRepo, cartFactory: ICartFactory);
    HandleAsync(command: AddMovieToCart): Promise<any>;
}
//# sourceMappingURL=AddMovieToCartHandler.d.ts.map
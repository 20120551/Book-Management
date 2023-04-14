import { ICommandHandler } from "@Shared/Commands";
import { UpdateMovieFromCart } from "@Application/Commands";
import { ICartRepo, IMovieRepo } from "@Domain/Repositories";
import { ICartFactory } from "@Domain/Factories";
export declare type IUpdateMovieFromCartHandler = ICommandHandler<UpdateMovieFromCart>;
export default class UpdateMovieFromCartHandler implements IUpdateMovieFromCartHandler {
    private readonly _movieRepo;
    private readonly _cartRepo;
    private readonly _cartFactory;
    constructor(movieRepo: IMovieRepo, cartRepo: ICartRepo, cartFactory: ICartFactory);
    HandleAsync(command: UpdateMovieFromCart): Promise<any>;
}
//# sourceMappingURL=UpdateMovieFromCartHandler.d.ts.map
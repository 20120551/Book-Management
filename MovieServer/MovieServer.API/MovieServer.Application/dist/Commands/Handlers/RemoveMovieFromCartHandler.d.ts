import { ICommandHandler } from "@Shared/Commands";
import { RemoveMovieFromCart } from "@Application/Commands";
import { ICartRepo } from "@Domain/Repositories";
export declare type IRemoveMovieFromCartHandler = ICommandHandler<RemoveMovieFromCart>;
export default class RemoveMovieFromCartHandler implements IRemoveMovieFromCartHandler {
    private readonly _cartRepo;
    constructor(cartRepo: ICartRepo);
    HandleAsync(command: RemoveMovieFromCart): Promise<any>;
}
//# sourceMappingURL=RemoveMovieFromCartHandler.d.ts.map
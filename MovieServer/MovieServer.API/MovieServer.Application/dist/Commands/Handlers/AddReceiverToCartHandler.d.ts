import { ICommandHandler } from "@Shared/Commands";
import { AddReceiverToCart } from "@Application/Commands";
import { ICartRepo } from "@Domain/Repositories";
export declare type IAddReceiverToCartHandler = ICommandHandler<AddReceiverToCart>;
export default class AddReceiverToCartHandler implements IAddReceiverToCartHandler {
    private readonly _cartRepo;
    constructor(cartRepo: ICartRepo);
    HandleAsync(command: AddReceiverToCart): Promise<any>;
}
//# sourceMappingURL=AddReceiverToCartHandler.d.ts.map
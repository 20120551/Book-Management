import { ICommandHandler } from "@Shared/Commands";
import { UpdateReceiverFromCart } from "@Application/Commands";
import { ICartRepo } from "@Domain/Repositories";
export declare type IUpdateReceiverFromCartHandler = ICommandHandler<UpdateReceiverFromCart>;
export default class UpdateReceiverFromCartHandler implements IUpdateReceiverFromCartHandler {
    private readonly _cartRepo;
    constructor(cartRepo: ICartRepo);
    HandleAsync(command: UpdateReceiverFromCart): Promise<any>;
}
//# sourceMappingURL=UpdateReceiverFromCartHandler.d.ts.map
import { ICommandHandler } from "@movie/shared";
import { ICartRepo } from "@movie/domain";
import UpdateReceiverFromCart from "../UpdateReceiverFromCart";
export type IUpdateReceiverFromCartHandler = ICommandHandler<UpdateReceiverFromCart>;
export default class UpdateReceiverFromCartHandler implements IUpdateReceiverFromCartHandler {
    private readonly _cartRepo;
    constructor(cartRepo: ICartRepo);
    HandleAsync(command: UpdateReceiverFromCart): Promise<any>;
}

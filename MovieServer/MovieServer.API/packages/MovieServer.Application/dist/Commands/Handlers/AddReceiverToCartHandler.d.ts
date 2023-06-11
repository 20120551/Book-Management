import { ICommandHandler } from "@movie/shared";
import { ICartRepo } from "@movie/domain";
import AddReceiverToCart from "../AddReceiverToCart";
export type IAddReceiverToCartHandler = ICommandHandler<AddReceiverToCart>;
export default class AddReceiverToCartHandler implements IAddReceiverToCartHandler {
    private readonly _cartRepo;
    constructor(cartRepo: ICartRepo);
    HandleAsync(command: AddReceiverToCart): Promise<any>;
}

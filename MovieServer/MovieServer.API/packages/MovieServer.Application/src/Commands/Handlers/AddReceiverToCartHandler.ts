
import { CartRepo, ICommandHandler, Injectable } from "@movie/shared";
import { CartId, ICartRepo, Receiver } from "@movie/domain";
import AddReceiverToCart from "../AddReceiverToCart";
import { NotFoundCartException } from "../../Exceptions";

export type IAddReceiverToCartHandler = ICommandHandler<AddReceiverToCart>;
@Injectable
export default class AddReceiverToCartHandler implements IAddReceiverToCartHandler {

    private readonly _cartRepo: ICartRepo;

    constructor(
        @CartRepo cartRepo: ICartRepo,
    ) {
        this._cartRepo = cartRepo;
    }
    //automapper -> CartId, MovieItem
    async HandleAsync(command: AddReceiverToCart): Promise<any> {
        const { CartId: Id, FullName, PhoneNumber, Address } = command;
        const cart = await this._cartRepo.Get(CartId.Create(Id));
        if (cart === null) {
            throw new NotFoundCartException();
        }

        const receiver = new Receiver(FullName, Address, PhoneNumber);
        cart.ChangeReceiver(receiver);
        await this._cartRepo.Update(cart);
    }
}
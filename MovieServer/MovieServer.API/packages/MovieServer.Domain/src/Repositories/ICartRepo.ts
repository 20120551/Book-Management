import { Cart } from "../Entities";
import { CartId } from "../ValueObjects";

export default interface ICartRepo {
    Get(id: CartId): Promise<Cart | null>;
    Create(cart: Cart): Promise<any>;
    Update(cart: Cart): Promise<any>;
    Remove(cart: Cart): Promise<any>;
}
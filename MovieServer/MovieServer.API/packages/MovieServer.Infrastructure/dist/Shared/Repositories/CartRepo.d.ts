import { Cart, CartId, ICartRepo } from "@movie/domain";
import { AutoMapper } from "@movie/shared";
import { ICacheService } from "Shared/Services";
export default class CartRepo implements ICartRepo {
    private readonly _cacheService;
    private readonly _mapper;
    constructor(cacheService: ICacheService, mapper: AutoMapper);
    Get(id: CartId): Promise<Cart | null>;
    Create(cart: Cart): Promise<any>;
    Update(cart: Cart): Promise<any>;
    Remove(cart: Cart): Promise<any>;
}

import { Cart } from "@Domain/Entities";
import { ICartRepo } from "@Domain/Repositories";
import { CartId } from "@Domain/ValueObjects";
import { ICacheService } from "@Infrastructure/Shared/Services";
import { AutoMapper } from "@Shared/AutoMapper";
export default class CartRepo implements ICartRepo {
    private readonly _cacheService;
    private readonly _mapper;
    constructor(cacheService: ICacheService, mapper: AutoMapper);
    Get(id: CartId): Promise<Cart | null>;
    Create(cart: Cart): Promise<any>;
    Update(cart: Cart): Promise<any>;
    Remove(cart: Cart): Promise<any>;
}
//# sourceMappingURL=CartRepo.d.ts.map
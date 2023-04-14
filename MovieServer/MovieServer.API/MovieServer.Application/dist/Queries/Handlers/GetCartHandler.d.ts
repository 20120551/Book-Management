import { CartReadDto } from "@Application/DTO";
import { IQueryHandler } from "@Shared/Queries";
import { GetCart } from "@Application/Queries";
import { AutoMapper } from "@Shared/AutoMapper";
import { ICartRepo } from "@Domain/Repositories";
export declare type IGetCartHandler = IQueryHandler<GetCart, CartReadDto>;
export default class GetCartHandler implements IGetCartHandler {
    private readonly _cartRepo;
    private readonly _mapper;
    constructor(cartRepo: ICartRepo, mapper: AutoMapper);
    HandleAsync(query: GetCart): Promise<CartReadDto | null>;
}
//# sourceMappingURL=GetCartHandler.d.ts.map
import { CartReadDto } from "../../DTO";
import { IQueryHandler, AutoMapper } from "@movie/shared";
import { GetCart } from "../../Queries";
import { ICartRepo } from "@movie/domain";
export type IGetCartHandler = IQueryHandler<GetCart, CartReadDto>;
export default class GetCartHandler implements IGetCartHandler {
    private readonly _cartRepo;
    private readonly _mapper;
    constructor(cartRepo: ICartRepo, mapper: AutoMapper);
    HandleAsync(query: GetCart): Promise<CartReadDto | null>;
}

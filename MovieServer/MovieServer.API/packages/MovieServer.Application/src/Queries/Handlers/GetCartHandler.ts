import { CartReadDto } from "../../DTO";
import { IQueryHandler, AutoMapper, CartRepo, Injectable, Mapper } from "@movie/shared";
import { GetCart } from "../../Queries";
import { Cart, CartId, ICartRepo } from "@movie/domain";
import { NotFoundCartException } from "../../Exceptions";

export type IGetCartHandler = IQueryHandler<GetCart, CartReadDto>;
@Injectable
export default class GetCartHandler implements IGetCartHandler {
    private readonly _cartRepo: ICartRepo;
    private readonly _mapper: AutoMapper;

    constructor(
        @CartRepo cartRepo: ICartRepo,
        @Mapper mapper: AutoMapper,
    ) {
        this._mapper = mapper;
        this._cartRepo = cartRepo;
    }

    async HandleAsync(query: GetCart): Promise<CartReadDto | null> {
        const cart = await this._cartRepo.Get(CartId.Create(query.Id));
        if (cart === null) {
            throw new NotFoundCartException();
        }
        const cartResponse = this._mapper.map(cart, Cart, CartReadDto);
        return cartResponse;
    }

}
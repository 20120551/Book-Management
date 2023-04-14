import { CartReadDto } from "@Application/DTO";
import { IQueryHandler } from "@Shared/Queries";
import { GetCart } from "@Application/Queries";
import { AutoMapper } from "@Shared/AutoMapper";
import { ICartRepo } from "@Domain/Repositories";
import { CartRepo, Injectable, Mapper } from "@Shared/IoC";
import { CartId } from "@Domain/ValueObjects";
import { NotFoundCartException } from "@Application/Exceptions";
import { Cart } from "@Domain/Entities";

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

import { AutoMapper, CartRepo, ICommandHandler, Injectable, Mapper } from "@movie/shared";
import { Cart, ICartRepo } from "@movie/domain";
import CreateCart from "../CreateCart";

export type ICreateCartHandler = ICommandHandler<CreateCart>;
@Injectable
export default class CreateCartHandler implements ICreateCartHandler {
    private readonly _cartRepo: ICartRepo;
    private readonly _mapper: AutoMapper;

    constructor(
        @CartRepo cartRepo: ICartRepo,
        @Mapper mapper: AutoMapper,
    ) {
        this._mapper = mapper;
        this._cartRepo = cartRepo;
    }
    async HandleAsync(command: CreateCart): Promise<any> {
        const cart = this._mapper.map(command, CreateCart, Cart);
        await this._cartRepo.Create(cart);
    }
}
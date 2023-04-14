import { ICommandHandler } from "@Shared/Commands";
import { CreateCart } from "@Application/Commands";
import { CartRepo, Injectable, Mapper } from "@Shared/IoC";
import { ICartRepo } from "@Domain/Repositories";
import { AutoMapper } from "@Shared/AutoMapper";
import { Cart } from "@Domain/Entities";

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

import { AutoMapper, CartRepo, ICommandHandler, Injectable, Mapper } from "@movie/shared";
import { CartId, ICartRepo } from "@movie/domain";
import RemoveCart from "../RemoveCart";
import { NotFoundCartException } from "../../Exceptions";
export type IRemoveCartHandler = ICommandHandler<RemoveCart>;

@Injectable
export default class RemoveCartHandler implements IRemoveCartHandler {
    private readonly _cartRepo: ICartRepo;
    private readonly _mapper: AutoMapper;

    constructor(
        @CartRepo cartRepo: ICartRepo,
        @Mapper mapper: AutoMapper,
    ) {
        this._mapper = mapper;
        this._cartRepo = cartRepo;
    }
    async HandleAsync(command: RemoveCart): Promise<any> {
        const _cart = await this._cartRepo.Get(CartId.Create(command.Id));
        if (_cart === null) {
            throw new NotFoundCartException();
        }
        await this._cartRepo.Remove(_cart);
    }
}
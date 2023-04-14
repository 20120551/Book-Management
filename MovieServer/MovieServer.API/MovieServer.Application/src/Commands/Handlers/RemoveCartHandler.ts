import { ICommandHandler } from "@Shared/Commands";
import { RemoveCart } from "@Application/Commands";
import { CartRepo, Injectable, Mapper } from "@Shared/IoC";
import { ICartRepo } from "@Domain/Repositories";
import { AutoMapper } from "@Shared/AutoMapper";
import { Cart } from "@Domain/Entities";
import { NotFoundCartException } from "@Application/Exceptions";
import { CartId } from "@Domain/ValueObjects";

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
import { AutoMapper, ICommandHandler } from "@movie/shared";
import { ICartRepo } from "@movie/domain";
import RemoveCart from "../RemoveCart";
export type IRemoveCartHandler = ICommandHandler<RemoveCart>;
export default class RemoveCartHandler implements IRemoveCartHandler {
    private readonly _cartRepo;
    private readonly _mapper;
    constructor(cartRepo: ICartRepo, mapper: AutoMapper);
    HandleAsync(command: RemoveCart): Promise<any>;
}

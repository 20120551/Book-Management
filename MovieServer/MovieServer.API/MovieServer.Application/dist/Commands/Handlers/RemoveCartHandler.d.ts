import { ICommandHandler } from "@Shared/Commands";
import { RemoveCart } from "@Application/Commands";
import { ICartRepo } from "@Domain/Repositories";
import { AutoMapper } from "@Shared/AutoMapper";
export declare type IRemoveCartHandler = ICommandHandler<RemoveCart>;
export default class RemoveCartHandler implements IRemoveCartHandler {
    private readonly _cartRepo;
    private readonly _mapper;
    constructor(cartRepo: ICartRepo, mapper: AutoMapper);
    HandleAsync(command: RemoveCart): Promise<any>;
}
//# sourceMappingURL=RemoveCartHandler.d.ts.map
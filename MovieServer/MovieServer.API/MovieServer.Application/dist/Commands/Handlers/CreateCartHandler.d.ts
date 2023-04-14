import { ICommandHandler } from "@Shared/Commands";
import { CreateCart } from "@Application/Commands";
import { ICartRepo } from "@Domain/Repositories";
import { AutoMapper } from "@Shared/AutoMapper";
export declare type ICreateCartHandler = ICommandHandler<CreateCart>;
export default class CreateCartHandler implements ICreateCartHandler {
    private readonly _cartRepo;
    private readonly _mapper;
    constructor(cartRepo: ICartRepo, mapper: AutoMapper);
    HandleAsync(command: CreateCart): Promise<any>;
}
//# sourceMappingURL=CreateCartHandler.d.ts.map
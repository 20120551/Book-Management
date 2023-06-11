import { AutoMapper, ICommandHandler } from "@movie/shared";
import { ICartRepo } from "@movie/domain";
import CreateCart from "../CreateCart";
export type ICreateCartHandler = ICommandHandler<CreateCart>;
export default class CreateCartHandler implements ICreateCartHandler {
    private readonly _cartRepo;
    private readonly _mapper;
    constructor(cartRepo: ICartRepo, mapper: AutoMapper);
    HandleAsync(command: CreateCart): Promise<any>;
}

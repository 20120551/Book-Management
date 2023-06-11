import { CartReadDto } from "@movie/application";
import { Cart, CartId, ICartRepo } from "@movie/domain";
import { AutoMapper, CacheService, Injectable, Mapper } from "@movie/shared";
import { ICacheService } from "Shared/Services";

@Injectable
export default class CartRepo implements ICartRepo {

    private readonly _cacheService: ICacheService;
    private readonly _mapper: AutoMapper;
    constructor(
        @CacheService cacheService: ICacheService,
        @Mapper mapper: AutoMapper
    ) {
        this._cacheService = cacheService;
        this._mapper = mapper;
    }
    async Get(id: CartId): Promise<Cart | null> {
        const data = await this._cacheService.Get<CartReadDto>(id.Guid);
        if (data === null) return null;
        return this._mapper.map(data, CartReadDto, Cart);
    }
    async Create(cart: Cart): Promise<any> {
        //default time to leave
        const data = this._mapper.map(cart, Cart, CartReadDto);
        await this._cacheService.Set(cart.Id.Guid, data, Cart.TIME_TO_LEAVE);
    }
    async Update(cart: Cart): Promise<any> {
        const data = this._mapper.map(cart, Cart, CartReadDto);
        await this._cacheService.Set(cart.Id.Guid, data, Cart.TIME_TO_LEAVE);
    }
    async Remove(cart: Cart): Promise<any> {
        await this._cacheService.Remove(cart.Id.Guid);
    }

}
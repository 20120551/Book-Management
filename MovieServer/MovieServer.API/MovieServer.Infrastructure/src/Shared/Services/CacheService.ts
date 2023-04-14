import { CacheDbClient, Injectable } from "@Shared/IoC"
import ICacheService from "./ICacheService";
import { CacheClient } from "@Infrastructure/Shared/Repositories";

@Injectable
export default class CacheService implements ICacheService {

    private readonly _cache: CacheClient;
    constructor(
        @CacheDbClient cache: CacheClient
    ) {
        this._cache = cache;
    }

    async Get<TSet>(key: string): Promise<TSet | null> {
        const _data = await this._cache.get(key);
        if (_data) {
            const data = JSON.parse(_data);
            return data;
        }
        return null;
    }

    async Set<TSet>(key: string, data: TSet, ttl: number): Promise<any> {
        const _data = JSON.stringify(data);
        await this._cache.set(key, _data, {
            EX: ttl
        });
    }

    async Remove(key: string): Promise<any> {
        await this._cache.del(key);
    }

}
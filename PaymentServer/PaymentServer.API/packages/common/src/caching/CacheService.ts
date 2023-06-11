import { plainToClass, plainToInstance } from "class-transformer";
import { RedisClient } from "../ioc";
import { ICacheService } from "./ICacheService";
import { RedisClientType } from "redis";

export class CacheService implements ICacheService {
    constructor(
        @RedisClient private _client: RedisClientType
    ) {

    }

    async keys(key: string): Promise<string[]> {
        return await this._client.keys(key);
    }
    async set<TCache>(key: string, data: TCache, ttl: number): Promise<void> {
        const serializeData = JSON.stringify(data);
        await this._client.set(key, serializeData, { EX: ttl });
    }
    async get<TCache>(key: string, ctor: new (...args: any) => TCache): Promise<TCache | null> {
        const data = await this._client.get(key);
        if (!data) {
            return null;
        }

        const deserializeData = JSON.parse(data);
        return plainToInstance(ctor, deserializeData);
    }
    async remove(key: string): Promise<boolean> {
        const isExist = await this._client.exists(key);
        if (!isExist) {
            return false;
        }

        await this._client.del(key);
        return true;
    }

}
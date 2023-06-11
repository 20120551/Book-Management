import { ICacheService } from "./ICacheService";
import { RedisClientType } from "redis";
export declare class CacheService implements ICacheService {
    private _client;
    constructor(_client: RedisClientType);
    set<TCache>(key: string, data: TCache, ttl: number): Promise<void>;
    get<TCache>(key: string): Promise<TCache | null>;
    remove(key: string): Promise<boolean>;
}

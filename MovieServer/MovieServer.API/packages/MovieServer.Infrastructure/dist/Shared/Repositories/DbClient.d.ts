import { RedisClientType } from "redis";
export type CacheClient = RedisClientType;
export type RedisType = {
    host: string;
    username?: string;
    password?: string;
    port: number;
};
export declare function GetCacheConnection({ host, username, password, port }: RedisType): Promise<CacheClient>;

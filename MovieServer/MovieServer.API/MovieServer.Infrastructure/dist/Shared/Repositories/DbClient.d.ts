import { RedisClientType } from "redis";
export declare type CacheClient = RedisClientType;
export declare type RedisType = {
    host: string;
    username?: string;
    password?: string;
    port: number;
};
export declare function GetCacheConnection({ host, username, password, port }: RedisType): Promise<CacheClient>;
//# sourceMappingURL=DbClient.d.ts.map
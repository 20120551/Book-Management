import { RedisClientType, createClient } from "redis";

export type CacheClient = RedisClientType;
export type RedisType = {
    host: string,
    username?: string,
    password?: string,
    port: number
};
export function GetCacheConnection(
    { host, username, password, port }: RedisType
): Promise<CacheClient> {

    let connectionString: string = "";
    if (username !== undefined) {
        connectionString = `redis://${username}:${password}@${host}:${port}`
    } else {
        connectionString = `redis://${host}:${port}`
    }
    return new Promise<CacheClient>((res, rej) => {
        const client = createClient({ url: connectionString }) as CacheClient;
        client.connect()
            .then(() => {
                console.log('connect to redis server successfully');
                res(client);
            })
            .catch((err) => {
                console.log('cannot connect to redis server');
                rej(err);
            })
    })
}
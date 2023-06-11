import { createClient } from "redis";

export * from "./CacheService";
export * from "./ICacheService";

export function createRedisConnection(conn: string) {
    const client = createClient({ url: conn });
    return new Promise((res, rej) => {
        client.connect()
            .then(() => res(client))
            .catch(err => rej(err));
    })
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCacheConnection = void 0;
const redis_1 = require("redis");
function GetCacheConnection({ host, username, password, port }) {
    let connectionString = "";
    if (username !== undefined) {
        connectionString = `redis://${username}:${password}@${host}:${port}`;
    }
    else {
        connectionString = `redis://${host}:${port}`;
    }
    return new Promise((res, rej) => {
        const client = (0, redis_1.createClient)({ url: connectionString });
        client.connect()
            .then(() => {
            console.log('connect to redis server successfully');
            res(client);
        })
            .catch((err) => {
            console.log('cannot connect to redis server');
            rej(err);
        });
    });
}
exports.GetCacheConnection = GetCacheConnection;

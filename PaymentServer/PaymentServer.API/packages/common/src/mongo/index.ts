import { MongoClient } from "mongodb";

export * from "./EventSource";
export * from "./IEventSource";
export * from "./IRepository";
export * from "./Repository";
export * from "./GenericRepository";
export * from "./IGenericRepository";


// load data from env
export async function createMongoConnection(conn: string, db: string) {
    const client = new MongoClient(conn, {});
    return new Promise((res, rej) => {
        client.connect()
            .then(() => res({
                db: client.db(db),
                client
            }))
            .catch(err => rej(err));
    })
}

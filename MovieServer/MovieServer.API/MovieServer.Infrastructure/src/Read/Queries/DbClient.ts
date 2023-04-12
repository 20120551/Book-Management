import mongoose, { Mongoose } from "mongoose";

export type DbClient = Mongoose;
export type DbType = {
    database: string,
    host: string,
    username: string,
    password: string,
    port: number
};

export async function GetDatabaseClient({ username, password, host, port, database }: DbType) {
    return new Promise<DbClient>((res, rej) => {
        const connString = `mongodb://${username}:${password}@${host}:${port}/${database}`;
        mongoose.connect(connString);
        const db = mongoose.connection;
        db.on("error", (e) => {
            console.log("db connection fail");
            rej(e);
        });
        db.on("open", () => {
            // create schema
            console.log("db connection successfully");
            res(mongoose);
        })
    })
}
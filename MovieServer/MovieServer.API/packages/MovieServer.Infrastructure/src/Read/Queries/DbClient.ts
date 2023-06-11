import mongoose, { Mongoose } from "mongoose";

export type DbClientReadSide = Mongoose;
export type DbReadType = {
    database: string,
    host: string,
    username: string,
    password: string,
    port: number
};

export async function GetReadDatabaseClient({ username, password, host, port, database }: DbReadType) {
    return new Promise<DbClientReadSide>((res, rej) => {
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
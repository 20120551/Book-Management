import mongoose, { Mongoose } from "mongoose";
export type DbClientReadSide = Mongoose;
export type DbReadType = {
    database: string;
    host: string;
    username: string;
    password: string;
    port: number;
};
export declare function GetReadDatabaseClient({ username, password, host, port, database }: DbReadType): Promise<typeof mongoose>;

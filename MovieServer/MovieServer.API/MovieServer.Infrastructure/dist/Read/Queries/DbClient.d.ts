import mongoose, { Mongoose } from "mongoose";
export declare type DbClient = Mongoose;
export declare type DbType = {
    database: string;
    host: string;
    username: string;
    password: string;
    port: number;
};
export declare function GetDatabaseClient({ username, password, host, port, database }: DbType): Promise<typeof mongoose>;
//# sourceMappingURL=DbClient.d.ts.map
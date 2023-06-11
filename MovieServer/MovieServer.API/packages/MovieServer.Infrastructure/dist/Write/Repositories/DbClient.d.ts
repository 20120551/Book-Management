import { Sequelize } from "sequelize";
export type DbClientWriteSide = Sequelize;
export type DbWriteType = {
    database: string;
    host: string;
    username: string;
    password: string;
    port: number;
};
export declare function GetWriteDatabaseClient({ database, host, username, password, port }: DbWriteType): Promise<Sequelize>;

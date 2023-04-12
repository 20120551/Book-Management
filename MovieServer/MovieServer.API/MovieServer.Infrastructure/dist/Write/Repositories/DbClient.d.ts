import { Sequelize } from "sequelize";
export declare type DbClient = Sequelize;
export declare type DbType = {
    database: string;
    host: string;
    username: string;
    password: string;
    port: number;
};
export declare function GetDatabaseClient({ database, host, username, password, port }: DbType): Promise<Sequelize>;
//# sourceMappingURL=DbClient.d.ts.map
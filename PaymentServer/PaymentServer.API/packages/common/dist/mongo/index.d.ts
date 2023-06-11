export * from "./EventSource";
export * from "./IEventSource";
export * from "./IRepository";
export * from "./Repository";
export * from "./GenericRepository";
export * from "./IGenericRepository";
export declare function createMongoConnection(conn: string, db: string): Promise<unknown>;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = exports.dbWriteSideConfig = exports.dbReadSideConfig = exports.env = void 0;
exports.env = {
    PORT: process.env.PORT,
    AMQP_URL: process.env.AMQP_URL
};
exports.dbReadSideConfig = {
    database: process.env.READ_DB_NAME || "",
    host: process.env.READ_DB_HOST || "",
    username: process.env.READ_DB_USERNAME || "",
    password: process.env.READ_DB_PASSWORD || "",
    port: parseInt(process.env.READ_DB_PORT || "27017"),
};
exports.dbWriteSideConfig = {
    database: process.env.WRITE_DB_NAME || "",
    host: process.env.WRITE_DB_HOST || "",
    username: process.env.WRITE_DB_USERNAME || "",
    password: process.env.WRITE_DB_PASSWORD || "",
    port: parseInt(process.env.WRITE_DB_PORT || "1433"),
};
exports.redisConfig = {
    host: process.env.REDIS_HOST || "",
    port: parseInt(process.env.REDIS_PORT || "6379")
};

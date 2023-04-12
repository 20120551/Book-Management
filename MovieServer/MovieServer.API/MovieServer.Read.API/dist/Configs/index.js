"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = exports.env = void 0;
exports.env = {
    PORT: process.env.PORT,
    AMQP_URL: process.env.AMQP_URL,
};
exports.dbConfig = {
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    port: parseInt(process.env.DB_PORT || "27017"),
};

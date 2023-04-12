"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDatabaseClient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function GetDatabaseClient({ username, password, host, port, database }) {
    return new Promise((res, rej) => {
        const connString = `mongodb://${username}:${password}@${host}:${port}/${database}`;
        mongoose_1.default.connect(connString);
        const db = mongoose_1.default.connection;
        db.on("error", (e) => {
            console.log("db connection fail");
            rej(e);
        });
        db.on("open", () => {
            // create schema
            console.log("db connection successfully");
            res(mongoose_1.default);
        });
    });
}
exports.GetDatabaseClient = GetDatabaseClient;

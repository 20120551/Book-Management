"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMongoConnection = void 0;
const mongodb_1 = require("mongodb");
__exportStar(require("./EventSource"), exports);
__exportStar(require("./IEventSource"), exports);
__exportStar(require("./IRepository"), exports);
__exportStar(require("./Repository"), exports);
__exportStar(require("./GenericRepository"), exports);
__exportStar(require("./IGenericRepository"), exports);
// load data from env
async function createMongoConnection(conn, db) {
    const client = new mongodb_1.MongoClient(conn, {});
    return new Promise((res, rej) => {
        client.connect()
            .then(() => res({
            db: client.db(db),
            client
        }))
            .catch(err => rej(err));
    });
}
exports.createMongoConnection = createMongoConnection;

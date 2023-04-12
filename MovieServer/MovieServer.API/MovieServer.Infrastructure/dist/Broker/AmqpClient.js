"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAmqpClient = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
//function for connect to amqp rabbitmq
async function GetAmqpClient(amqpUrl) {
    try {
        const conn = await amqplib_1.default.connect(amqpUrl);
        console.log(`connect to amqp server successfully with url ${amqpUrl}`);
        return conn;
    }
    catch (err) {
        console.log(`error when trying to connect to amqp server with url ${amqpUrl}`);
        throw err;
    }
}
exports.GetAmqpClient = GetAmqpClient;

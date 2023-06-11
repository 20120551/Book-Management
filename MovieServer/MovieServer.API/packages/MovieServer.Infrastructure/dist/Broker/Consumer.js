"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
let Consumer = class Consumer {
    // inject connection here
    constructor(amqpClient) {
        this._amqpClient = amqpClient;
    }
    async Subscribe(exchange, type, bindingKey, handler) {
        // create channel
        const channel = await this._amqpClient.createChannel();
        // assert exchange
        await channel.assertExchange(exchange, type, { durable: false });
        // assert queue
        const queue = await channel.assertQueue('', { exclusive: true });
        // bind queue
        await channel.bindQueue(queue.queue, exchange, bindingKey);
        // consume event with handler method
        await channel.consume(queue.queue, async function (msg) {
            if (!msg) {
                throw new Error('Message was not send to queue');
            }
            const content = msg.content.toString();
            const jsonContent = JSON.parse(content);
            // Object.setPrototypeOf(jsonContent, THandler.prototype)
            handler(jsonContent);
        }, { noAck: true });
    }
};
Consumer = __decorate([
    shared_1.Injectable,
    __param(0, shared_1.AmqpClient),
    __metadata("design:paramtypes", [Object])
], Consumer);
exports.default = Consumer;
/*
    - consum between read and write side (write side publish -> read side listen)
        +) Handle on infrastructure layer (because not relevant to domain layer)
    - consum between write side and other service (other service publish -> write side listen)
        +) Handle on application layer (because write side relevant to domain layer)
        +) Write handler for each topic
        
    => all consumer listen on presentation layer (.API layer)
*/ 

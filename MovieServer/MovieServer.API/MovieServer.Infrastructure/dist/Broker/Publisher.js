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
const IoC_1 = require("@Shared/IoC");
let Publisher = class Publisher {
    constructor(amqpClient) {
        this._amqpClient = amqpClient;
    }
    async Publish(exchange, type, routingKey, data, options) {
        try {
            // create channel
            const channel = await this._amqpClient.createChannel();
            // serialize message
            const serializeData = JSON.stringify(data);
            // create exchange
            const message = Buffer.from(serializeData, "utf-8");
            // publishing event
            await channel.assertExchange(exchange, type, { durable: false });
            channel.publish(exchange, routingKey, message, options);
            console.log(`Publish to exchange ${exchange} with routing key ${routingKey}`);
        }
        catch (err) {
            console.log(`error when publishing message ${err}`);
        }
    }
};
Publisher = __decorate([
    IoC_1.Injectable,
    __param(0, IoC_1.AmqpClient),
    __metadata("design:paramtypes", [Object])
], Publisher);
exports.default = Publisher;

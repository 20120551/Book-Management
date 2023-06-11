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
exports.EventBus = void 0;
const winston_1 = require("winston");
const IEventBus_1 = require("./IEventBus");
const ioc_1 = require("../ioc");
const EventDescriptor_1 = require("./EventDescriptor");
const DomainException_1 = require("../exception/DomainException");
const inversify_1 = require("inversify");
let EventBus = exports.EventBus = class EventBus {
    _connection;
    _logger;
    _eventHandlers;
    constructor(logger, connection, eventHandlers) {
        this._connection = connection;
        this._logger = logger;
        this._eventHandlers = eventHandlers;
    }
    async publish(exchange, event, options) {
        const { correlationId, replyTo } = options;
        // assert exchange
        const channel = await this._connection.createChannel();
        await channel.assertExchange(exchange, IEventBus_1.ExchangeType.TOPIC, { durable: false });
        const routingKey = `${exchange}.${event.eventName}`;
        const data = JSON.stringify(event);
        channel.publish(exchange, routingKey, Buffer.from(data), { correlationId, replyTo });
        this._logger.info(`publish event ${event.eventName} to exchange ${exchange}`);
    }
    async subscribe(exchange, onError) {
        // assert exchange
        const channel = await this._connection.createChannel();
        await channel.assertExchange(exchange, IEventBus_1.ExchangeType.TOPIC, { durable: false });
        // bind queue
        const queue = await channel.assertQueue("", { exclusive: false });
        const routingKey = `${exchange}.#`;
        await channel.bindQueue(queue.queue, exchange, routingKey);
        await channel.consume(queue.queue, async (message) => {
            if (!message) {
                // error here
                return;
            }
            // parse message
            const _message = message.content.toString();
            const payload = JSON.parse(_message);
            // payload to event
            // get handler
            const handlers = this._eventHandlers.filter(handler => handler.event == payload.eventName);
            const event = EventDescriptor_1.EventDescriptor.createEvent(payload);
            // try handle event
            await this.handleEvent(exchange, event, handlers, message.properties, onError);
            channel.ack(message);
        }, {
            noAck: false
        });
    }
    async handleEvent(exchange, event, handlers, options, onError) {
        // add retry policy
        try {
            this._logger.info(`try to handling event ${event.eventName} at exchange ${exchange}`);
            await Promise.all(handlers.map(handler => handler.Handle(event)));
            this._logger.info(`handled event ${event.eventName} at exchange ${exchange}`);
        }
        catch (err) {
            if (err instanceof DomainException_1.DomainException && onError) {
                const _event = onError(event, err);
                await this.publish(exchange, _event, options);
                this._logger.info(`publishing event ${_event.eventName} at exchange ${exchange}`);
            }
            throw new Error(`something wrong with when handling event ${event.eventName}`);
        }
    }
};
exports.EventBus = EventBus = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, ioc_1.ILogger),
    __param(1, ioc_1.AmqpConnection),
    __param(2, ioc_1.IEventHandlerModule),
    __metadata("design:paramtypes", [winston_1.Logger, Object, Array])
], EventBus);

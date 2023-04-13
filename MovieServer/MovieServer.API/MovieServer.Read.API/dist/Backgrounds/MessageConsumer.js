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
const Events_1 = require("@Application/Queries/Events");
const IoC_1 = require("@Shared/IoC");
let MessageConsumer = class MessageConsumer {
    _queryDispatcher;
    _consumer;
    constructor(queryDispatcher, consumer) {
        this._consumer = consumer;
        this._queryDispatcher = queryDispatcher;
    }
    async Consume() {
        try {
            await this._consumer.Subscribe("movie", "direct", "movie.created", async (content) => {
                const { Id, Status, Name, Slot, Price, Localization } = content;
                const event = new Events_1.MovieCreated(Id, Name, Status, Slot, Price, Localization);
                await this._queryDispatcher.ExecuteAsync(event);
            });
            await this._consumer.Subscribe("movie", "direct", "movie.removed", async (content) => {
                const { Id } = content;
                const event = new Events_1.MovieRemoved(Id);
                await this._queryDispatcher.ExecuteAsync(event);
            });
            await this._consumer.Subscribe("movie", "direct", "movie.updated", async (content) => {
                const { Id, Status, Name, Slot, Price, Localization } = content;
                const event = new Events_1.MovieUpdated(Id, Name, Status, Slot, Price, Localization);
                await this._queryDispatcher.ExecuteAsync(event);
            });
            await this._consumer.Subscribe("movie", "direct", "movie.actor.added", async (content) => {
                const { Id, ActorId, Name, Role } = content;
                const event = new Events_1.ActorAdded(Id, ActorId, Name, Role);
                await this._queryDispatcher.ExecuteAsync(event);
            });
            await this._consumer.Subscribe("movie", "direct", "movie.actor.removed", async (content) => {
                const { Id, ActorId } = content;
                const event = new Events_1.ActorRemoved(Id, ActorId);
                await this._queryDispatcher.ExecuteAsync(event);
            });
        }
        catch (err) {
            console.log(`error when trying to handle event ${err}`);
        }
    }
};
MessageConsumer = __decorate([
    IoC_1.Injectable,
    __param(0, IoC_1.QueryDispatcher),
    __param(1, IoC_1.Consumer),
    __metadata("design:paramtypes", [Object, Object])
], MessageConsumer);
exports.default = MessageConsumer;

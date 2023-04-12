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
let MessageConsumer = class MessageConsumer {
    _actorAddedEventHandler;
    _actorRemovedEventHandler;
    _movieCreatedEventHandler;
    _movieRemovedEventHandler;
    _movieUpdatedEventHandler;
    _consumer;
    constructor(consumer, actorAddedEventHandler, actorRemovedEventHandler, movieCreatedEventHandler, movieUpdatedEventHandler, movieRemovedEventHandler) {
        this._actorAddedEventHandler = actorAddedEventHandler;
        this._actorRemovedEventHandler = actorRemovedEventHandler;
        this._movieCreatedEventHandler = movieCreatedEventHandler;
        this._movieRemovedEventHandler = movieRemovedEventHandler;
        this._movieUpdatedEventHandler = movieUpdatedEventHandler;
        this._consumer = consumer;
    }
    async Consume() {
        try {
            await this._consumer.Subscribe("movie", "direct", "movie.created", this._movieCreatedEventHandler.HandleAsync);
            await this._consumer.Subscribe("movie", "direct", "movie.removed", this._movieRemovedEventHandler.HandleAsync);
            await this._consumer.Subscribe("movie", "direct", "movie.updated", this._movieUpdatedEventHandler.HandleAsync);
            await this._consumer.Subscribe("movie", "direct", "movie.actor.added", this._actorAddedEventHandler.HandleAsync);
            await this._consumer.Subscribe("movie", "direct", "movie.actor.removed", this._actorRemovedEventHandler.HandleAsync);
        }
        catch (err) {
            console.log(`error when trying to handle event ${err}`);
        }
    }
};
MessageConsumer = __decorate([
    IoC_1.Injectable,
    __param(0, IoC_1.Consumer),
    __param(1, IoC_1.ActorAddedEventHandler),
    __param(2, IoC_1.ActorRemovedEventHandler),
    __param(3, IoC_1.MovieCreatedEventHandler),
    __param(4, IoC_1.MovieUpdatedEventHandler),
    __param(5, IoC_1.MovieRemovedEventHandler),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], MessageConsumer);
exports.default = MessageConsumer;

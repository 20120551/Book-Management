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
const domain_1 = require("@movie/domain");
const Exceptions_1 = require("../../Exceptions");
const Events_1 = require("../../Queries/Events");
let RemoveMovieHandler = class RemoveMovieHandler {
    /**
     * constructor
     */
    constructor(movieRepo, mapper, publisher) {
        this._movieRepo = movieRepo;
        this._mapper = mapper;
        this._publisher = publisher;
    }
    async HandleAsync(command) {
        // check movie is existed
        const movie = await this._movieRepo.Get(domain_1.MovieId.Create(command.Id));
        if (movie === null) {
            throw new Exceptions_1.NotFoundMovieException();
        }
        // store to database
        await this._movieRepo.Remove(movie);
        // remove all actor associate with that movie
        // publish event
        const event = new Events_1.MovieRemoved(command.Id);
        await this._publisher.Publish("movie", "direct", "movie.removed", event);
    }
};
RemoveMovieHandler = __decorate([
    shared_1.Injectable,
    __param(0, shared_1.MovieRepo),
    __param(1, shared_1.Mapper),
    __param(2, shared_1.Publisher),
    __metadata("design:paramtypes", [Object, Object, Object])
], RemoveMovieHandler);
exports.default = RemoveMovieHandler;

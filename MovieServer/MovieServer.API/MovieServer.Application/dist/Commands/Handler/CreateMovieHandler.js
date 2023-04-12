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
const Commands_1 = require("@Application/Commands");
const IoC_1 = require("@Shared/IoC");
const Entities_1 = require("@Domain/Entities");
const DTO_1 = require("@Application/DTO");
const Events_1 = require("@Application/Queries/Events");
let CreateMovieHandler = class CreateMovieHandler {
    /**
     * constructor
     */
    constructor(movieRepo, mapper, publisher) {
        this._movieRepo = movieRepo;
        this._mapper = mapper;
        this._publisher = publisher;
    }
    async HandleAsync(command) {
        const { Id, Name, Status, Slot, Price, Localization } = command;
        const movieRequest = this._mapper.map(command, Commands_1.CreateMovie, Entities_1.Movie);
        // store to database
        const _movie = await this._movieRepo.Create(movieRequest);
        const movieResponse = this._mapper.map(_movie, Entities_1.Movie, DTO_1.MovieReadDto);
        // publishing event
        const event = new Events_1.MovieCreated(Id, Name, Status, Slot, Price, Localization);
        await this._publisher.Publish("movie", "direct", "movie.created", event);
        return movieResponse;
    }
};
CreateMovieHandler = __decorate([
    IoC_1.Injectable,
    __param(0, IoC_1.MovieRepo),
    __param(1, IoC_1.Mapper),
    __param(2, IoC_1.Publisher),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateMovieHandler);
exports.default = CreateMovieHandler;

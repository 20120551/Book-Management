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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
const domain_1 = require("@movie/domain");
const CreateMovie_1 = __importDefault(require("../CreateMovie"));
const Events_1 = require("../../Queries/Events");
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
        const movieRequest = this._mapper.map(command, CreateMovie_1.default, domain_1.Movie);
        // store to database
        await this._movieRepo.Create(movieRequest);
        // publishing event
        const event = new Events_1.MovieCreated(Id, Name, Status, Slot, Price, Localization);
        await this._publisher.Publish("movie", "direct", "movie.created", event);
    }
};
CreateMovieHandler = __decorate([
    shared_1.Injectable,
    __param(0, shared_1.MovieRepo),
    __param(1, shared_1.Mapper),
    __param(2, shared_1.Publisher),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateMovieHandler);
exports.default = CreateMovieHandler;

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
const Models_1 = require("../Models");
let MovieRepo = class MovieRepo {
    constructor(dbClient) {
        this._movieModel = dbClient.models.MovieModel;
    }
    async Get(id) {
        var movie = await this._movieModel.findOne({
            where: { Id: id.Guid },
            include: [Models_1.MovieModel.associations.Actors]
        });
        if (!movie) {
            return null;
        }
        return movie.get();
    }
    async Update(movie) {
        const { Id, Name, Slot, Price, Localization, Status, Actors } = movie;
        // update actor
        console.log(Actors);
        await this._movieModel.update({
            Name: Name,
            Slot: Slot,
            Price: Price,
            Localization: Localization,
            Status: Status,
            Actors: Actors
        }, {
            where: {
                Id: Id.Guid
            }
        });
    }
    async Create(movie) {
        const _movie = await this._movieModel.create({ ...movie });
        return _movie.get();
    }
    async Remove(movie) {
        await this._movieModel.destroy({
            where: {
                Id: movie.Id.Guid
            }
        });
    }
};
MovieRepo = __decorate([
    IoC_1.Injectable,
    __param(0, IoC_1.WriteDbClient),
    __metadata("design:paramtypes", [Object])
], MovieRepo);
exports.default = MovieRepo;

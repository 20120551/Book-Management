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
const application_1 = require("@movie/application");
const shared_1 = require("@movie/shared");
const express_1 = __importDefault(require("express"));
const MiddlewareFactory_1 = __importDefault(require("Middleware/MiddlewareFactory"));
const Middleware_1 = require("Middleware");
const inversify_express_utils_1 = require("inversify-express-utils");
//resolve middleware
const movieStatusMiddleware = MiddlewareFactory_1.default.Create(Middleware_1.MovieStatusMiddleware);
// @Injectable
let MovieController = class MovieController {
    constructor(commandDispatcher, queryDispatcher) {
        this._queryDispatcher = queryDispatcher;
        this._commandDispatcher = commandDispatcher;
    }
    async GetPerPage(req, res) {
        const { page, take } = req.query;
        const query = new application_1.GetMovies(parseInt(page), parseInt(take));
        const movies = await this._queryDispatcher.ExecuteAsync(query);
        return res.status(200).json(movies);
    }
    async Search(req, res) {
        const searchPhase = req.query.q;
        const query = new application_1.SearchMovie(searchPhase);
        const movies = await this._queryDispatcher.ExecuteAsync(query);
        return res.status(200).json(movies);
    }
    async Get(req, res) {
        const query = new application_1.GetMovie(req.params.id);
        const movie = await this._queryDispatcher.ExecuteAsync(query);
        return res.status(200).json(movie);
    }
    //router
    async Create(req, res) {
        const { Name, Status, Slot, Price, Localization } = req.body;
        const command = new application_1.CreateMovie(Name, Status, Slot, Price, Localization);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(201).json({
            message: 'create movie successfully',
            redirect_link: `http://localhost:5001/api/movie/${command.Id}`
        });
    }
    async Update(req, res) {
        const { Name, Status, Slot, Price, Localization } = req.body;
        const command = new application_1.UpdateMovie(req.params.movieId, Name, Status, Slot, Price, Localization);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(204).json();
    }
    async Delete(req, res) {
        // set command id
        const command = new application_1.RemoveMovie(req.params.movieId);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(204).json();
    }
    async AddActor(req, res) {
        const { Name, Role } = req.body;
        const command = new application_1.AddActorToMovie(req.params.movieId, Name, Role);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json({
            message: 'add success',
            redirect_link: `http://localhost:5001/api/movie/${command.Id}`
        });
    }
    async RemoveActor(req, res) {
        const { movieId, actorId } = req.params;
        const command = new application_1.RemoveActorFromMovie(movieId, actorId);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json({
            message: "remove success",
            redirect_link: `http://localhost:5001/api/movie/${command.Id}`
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpGet)("/"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "GetPerPage", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/search"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "Search", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "Get", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "Create", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:movieId", movieStatusMiddleware.CheckValidMovieActionBasedOnStatus([
        { status: "Trailer" },
        { status: "Comming soon" }
    ])),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "Update", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:movieId"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "Delete", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:movieId/actor"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "AddActor", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:movieId/actor/:actorId"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "RemoveActor", null);
MovieController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/movie"),
    __param(0, shared_1.CommandDispatcherModule),
    __param(1, shared_1.QueryDispatcherModule),
    __metadata("design:paramtypes", [Object, Object])
], MovieController);
exports.default = MovieController;

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
const Commands_1 = require("@Application/Commands");
const IoC_1 = require("@Shared/IoC");
const inversify_express_utils_1 = require("@Shared/Lib/inversify-express-utils");
const express_1 = __importDefault(require("express"));
// @Injectable
let MovieController = class MovieController {
    constructor(commandDispatcher) {
        this._commandDispatcher = commandDispatcher;
    }
    //router
    async Create(req, res) {
        const { Name, Status, Slot, Price, Localization } = req.body;
        const command = new Commands_1.CreateMovie(Name, Status, Slot, Price, Localization);
        const movie = await this._commandDispatcher.DispatchAsync(command);
        return res.status(201).json(movie);
    }
    async Update(req, res) {
        const { Name, Status, Slot, Price, Localization } = req.body;
        const command = new Commands_1.UpdateMovie(req.params.id, Name, Status, Slot, Price, Localization);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(204).json({ message: "update command success" });
    }
    async Delete(req, res) {
        // set command id
        const command = new Commands_1.RemoveMovie(req.params.id);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(204).json({ message: "remove command success" });
    }
    async AddActor(req, res) {
        const { Name, Role } = req.body;
        const command = new Commands_1.AddActorToMovie(req.params.id, Name, Role);
        const movie = await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json(movie);
    }
    async RemoveActor(req, res) {
        const { id, actorId } = req.params;
        const command = new Commands_1.RemoveActorFromMovie(id, actorId);
        const movie = await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json(movie);
    }
};
__decorate([
    (0, inversify_express_utils_1.httpPost)("/"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "Create", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:id"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "Update", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:id"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "Delete", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:id/actor"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "AddActor", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:id/actor/:actorId"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "RemoveActor", null);
MovieController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/movie"),
    __param(0, IoC_1.CommandDispatcher),
    __metadata("design:paramtypes", [Object])
], MovieController);
exports.default = MovieController;

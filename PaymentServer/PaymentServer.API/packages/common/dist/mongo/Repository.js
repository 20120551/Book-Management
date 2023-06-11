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
exports.Repository = void 0;
const ioc_1 = require("../ioc");
let Repository = exports.Repository = class Repository {
    _eventSource;
    _constructor;
    constructor(eventSource, constructor) {
        this._eventSource = eventSource;
        this._constructor = constructor;
    }
    async findById(id) {
        const events = await this._eventSource.findById(id);
        if (events == null) {
            throw new Error("");
        }
        // instantiate
        const aggregation = new this._constructor(id);
        aggregation.loadEvent(events);
        return aggregation;
    }
    async create(entity, version) {
        const events = entity.getUncommitedEvent();
        await this._eventSource.create(entity.guid, events, version);
    }
    async delete(entity) {
        const { aggregationId } = entity;
        await this._eventSource.delete(aggregationId);
    }
};
exports.Repository = Repository = __decorate([
    ioc_1.Injectable,
    __param(0, ioc_1.Unmanaged),
    __param(1, ioc_1.Unmanaged),
    __metadata("design:paramtypes", [Object, Function])
], Repository);

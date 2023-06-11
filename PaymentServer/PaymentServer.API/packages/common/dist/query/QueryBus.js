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
exports.QueryBus = void 0;
const ioc_1 = require("../ioc");
const inversify_1 = require("inversify");
let QueryBus = exports.QueryBus = class QueryBus {
    _container;
    constructor(container) {
        this._container = container;
    }
    execute(query) {
        const handlers = this._container.getAll(ioc_1.TYPES.IQueryHandlerModule);
        const handler = handlers.find(handler => handler.query === query.constructor.name);
        if (!handler) {
            return Promise.resolve(handler);
        }
        return handler.execute(query);
    }
};
exports.QueryBus = QueryBus = __decorate([
    ioc_1.Injectable,
    __param(0, ioc_1.ContainerModule),
    __metadata("design:paramtypes", [inversify_1.Container])
], QueryBus);

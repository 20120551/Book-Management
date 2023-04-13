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
const inversify_1 = require("inversify");
const Utils_1 = require("@Shared/IoC/Utils");
let CommandDispatcher = class CommandDispatcher {
    constructor(container) {
        this._container = container;
        this.DispatchAsync = this.DispatchAsync.bind(this);
    }
    DispatchAsync(command) {
        // get command handler based on TCommand
        console.log(`ICommandHandler<${command.constructor.name}>`);
        const symbol = (0, Utils_1.GetSymbol)(`ICommandHandler<${command.constructor.name}>`);
        const handler = this._container.get(symbol);
        // handle command
        return handler.HandleAsync(command);
    }
};
CommandDispatcher = __decorate([
    IoC_1.Injectable,
    __param(0, IoC_1.InversifyContainer),
    __metadata("design:paramtypes", [inversify_1.Container])
], CommandDispatcher);
exports.default = CommandDispatcher;

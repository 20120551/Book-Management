"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBus = void 0;
const ioc_1 = require("../ioc");
let CommandBus = exports.CommandBus = class CommandBus {
    _handlers = new Map();
    RegisterHandler(handler) {
        if (this._handlers.has(handler.command)) {
            // throw exception here
            throw new Error("");
        }
        this._handlers.set(handler.command, handler);
    }
    Send(command) {
        const handler = this._handlers.get(command.constructor.name);
        if (!handler) {
            throw new Error(`the handler was not exist with the command '${command.constructor.name}'`);
        }
        return handler.Handle(command);
    }
};
exports.CommandBus = CommandBus = __decorate([
    ioc_1.Injectable
], CommandBus);

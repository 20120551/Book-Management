"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
const IoC_1 = require("@Shared/IoC");
let ErrorHandlingMiddleware = class ErrorHandlingMiddleware {
    InvokeAsync(err, req, res, next) {
        console.error(`
            ----------------------------------
            EXCEPTION MIDDLEWARE
            HTTP ${req.method} ${req.url}
            ${err.message}
            ${err.stack}
            ----------------------------------
            `);
        if (err instanceof Exceptions_1.MovieException) {
            res.status(400).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "Internal server error" });
        }
        return Promise.resolve();
    }
};
ErrorHandlingMiddleware = __decorate([
    IoC_1.Injectable
], ErrorHandlingMiddleware);
exports.default = ErrorHandlingMiddleware;

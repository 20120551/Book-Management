"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
let RequestLogging = class RequestLogging {
    InvokeAsync(req, res, next) {
        console.log(`
    ----------------------------------
        REQUEST MIDDLEWARE
        HTTP ${req.method} ${req.url}
        ----------------------------------
        `);
        next();
        return Promise.resolve();
    }
};
RequestLogging = __decorate([
    shared_1.Injectable
], RequestLogging);
exports.default = RequestLogging;

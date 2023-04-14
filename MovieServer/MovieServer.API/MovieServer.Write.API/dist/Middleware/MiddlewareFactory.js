"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bootstrap_1 = require("../Bootstrap");
console.log(Bootstrap_1.container);
class MiddlewareFactory {
    constructor(_container) {
        this._container = _container;
    }
    Create(Type) {
        return new Type(this._container);
    }
}
const middlewareFactory = new MiddlewareFactory(Bootstrap_1.container);
exports.default = middlewareFactory;

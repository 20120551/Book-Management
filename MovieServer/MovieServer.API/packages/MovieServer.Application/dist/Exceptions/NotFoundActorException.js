"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
class NotFoundActorException extends shared_1.MovieException {
    constructor() {
        super('Not found actor');
    }
}
exports.default = NotFoundActorException;

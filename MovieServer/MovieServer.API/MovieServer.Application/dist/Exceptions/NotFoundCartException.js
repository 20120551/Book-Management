"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
class NotFoundCartException extends Exceptions_1.MovieException {
    constructor() {
        super('Not found Cart');
    }
}
exports.default = NotFoundCartException;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("@Shared/Exceptions");
class EmptySeatException extends Exceptions_1.MovieException {
    constructor() {
        super("seat can't not be empty");
    }
}
exports.default = EmptySeatException;

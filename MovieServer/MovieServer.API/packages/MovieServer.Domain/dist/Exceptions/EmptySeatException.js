"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
class EmptySeatException extends shared_1.MovieException {
    constructor() {
        super("seat can't not be empty");
    }
}
exports.default = EmptySeatException;

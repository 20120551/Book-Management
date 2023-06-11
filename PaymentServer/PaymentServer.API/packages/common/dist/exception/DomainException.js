"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainException = void 0;
class DomainException extends Error {
    constructor(message) {
        super(message);
    }
}
exports.DomainException = DomainException;

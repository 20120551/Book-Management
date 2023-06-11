"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unmanaged = exports.Injectable = void 0;
const inversify_1 = require("inversify");
exports.Injectable = (0, inversify_1.injectable)();
exports.Unmanaged = (0, inversify_1.unmanaged)();

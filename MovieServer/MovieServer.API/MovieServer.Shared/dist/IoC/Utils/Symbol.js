"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSymbol = void 0;
const IoC_1 = require("@Shared/IoC");
function GetSymbol(symbol) {
    return Object.values(IoC_1.TYPES).find((value) => value.toString() === Symbol(symbol).toString());
}
exports.GetSymbol = GetSymbol;

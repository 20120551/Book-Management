"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSymbol = void 0;
const Type_1 = require("./../Type");
function GetSymbol(symbol) {
    return Object.values(Type_1.TYPES).find((value) => value.toString() === Symbol(symbol).toString());
}
exports.GetSymbol = GetSymbol;

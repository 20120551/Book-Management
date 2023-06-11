import { TYPES } from "./../Type";

export function GetSymbol(symbol: string) {
    return Object.values(TYPES).find((value) => value.toString() === Symbol(symbol).toString());
}
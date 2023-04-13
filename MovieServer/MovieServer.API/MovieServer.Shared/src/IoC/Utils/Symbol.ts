import { TYPES } from "@Shared/IoC";

export function GetSymbol(symbol: string) {
    return Object.values(TYPES).find((value) => value.toString() === Symbol(symbol).toString());
}
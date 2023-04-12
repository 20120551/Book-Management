import { Actor } from "@Domain/ValueObjects";
import Localization from "./Localization";
export default class AnonymousMovie {
    Id: string;
    Name: string;
    Status: string;
    Slot: number;
    Price: number;
    Localization: Localization;
    Actors: Actor[];
    constructor(id: string, name: string, status: string, slot: number, price: number, localization: Localization, actors: Actor[]);
}
//# sourceMappingURL=AnonymousMovie.d.ts.map
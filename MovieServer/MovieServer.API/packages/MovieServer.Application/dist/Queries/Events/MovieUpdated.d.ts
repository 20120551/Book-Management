import { Localization } from "../../Utils";
import { IQuery } from "@movie/shared";
export default class MovieUpdated implements IQuery<void> {
    Id: string;
    Name: string;
    Status: string;
    Slot: number;
    Price: number;
    Localization: Localization;
    constructor(Id: string, Name: string, Status: string, Slot: number, Price: number, Localization: Localization);
}

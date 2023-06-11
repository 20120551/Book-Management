import { Localization } from "../../Utils";
import { IQuery } from "@movie/shared";
export default class MovieCreated implements IQuery<void> {
    Id: string;
    Name: string;
    Status: string;
    Slot: number;
    Price: number;
    Localization: Localization;
    constructor(Id: string, Name: string, Status: string, Slot: number, Price: number, Localization: Localization);
}

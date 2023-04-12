import { Localization } from "@Application/Utils";
import { IQuery } from "@Shared/Queries";
export default class MovieCreated implements IQuery<void> {
    Id: string;
    Name: string;
    Status: string;
    Slot: number;
    Price: number;
    Localization: Localization;
    constructor(Id: string, Name: string, Status: string, Slot: number, Price: number, Localization: Localization);
}
//# sourceMappingURL=MovieCreated.d.ts.map
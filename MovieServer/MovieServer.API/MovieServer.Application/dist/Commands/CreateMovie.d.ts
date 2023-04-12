import { ICommand } from '@Shared/Commands';
import { Localization } from '@Application/Utils';
export default class CreateMovie implements ICommand {
    Id: string;
    Name: string;
    Status: string;
    Slot: number;
    Price: number;
    Localization: Localization;
    constructor(name: string, status: string, slot: number, price: number, localization: Localization);
}
//# sourceMappingURL=CreateMovie.d.ts.map
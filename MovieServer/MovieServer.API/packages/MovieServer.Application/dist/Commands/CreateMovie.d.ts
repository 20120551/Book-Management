import { ICommand } from '@movie/shared';
import { Localization } from '../Utils';
export default class CreateMovie implements ICommand {
    Id: string;
    Name: string;
    Status: string;
    Slot: number;
    Price: number;
    Localization: Localization;
    constructor(name: string, status: string, slot: number, price: number, localization: Localization);
}

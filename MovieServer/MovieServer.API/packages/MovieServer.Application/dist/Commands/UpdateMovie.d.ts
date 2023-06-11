import { ICommand } from '@movie/shared';
import { Localization } from '../Utils';
export default class UpdateMovie implements ICommand {
    Id: string;
    Name: string;
    Status: string;
    Slot: number;
    Price: number;
    Localization: Localization;
    constructor(id: string, name: string, status: string, slot: number, price: number, localization: Localization);
}

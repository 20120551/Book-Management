import { AutoMaping } from '@Shared/AutoMapper';
import { ICommand } from '@Shared/Commands';

export default class RemoveCart implements ICommand {
    @AutoMaping
    public Id: string;
    // data for remove Cart
    constructor(
        id: string) {
        this.Id = id;
    }
}
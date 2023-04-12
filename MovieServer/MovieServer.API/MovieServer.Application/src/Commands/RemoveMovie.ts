import { AutoMaping } from '@Shared/AutoMapper';
import { ICommand } from '@Shared/Commands';

export default class RemoveMovie implements ICommand {
    @AutoMaping
    public Id: string;
    // data for remove movie
    constructor(
        id: string) {
        this.Id = id;
    }
}
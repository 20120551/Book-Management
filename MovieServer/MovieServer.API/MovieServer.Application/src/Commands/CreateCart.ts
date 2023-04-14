import { AutoMaping } from '@Shared/AutoMapper';
import { ICommand } from '@Shared/Commands';

export default class CreateCart implements ICommand {
    @AutoMaping
    public Id: string = `C_${Date.now()}`;
    // data for create movie
}
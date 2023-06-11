import { ICommand, AutoMaping } from '@movie/shared';

export default class RemoveMovie implements ICommand {
    @AutoMaping
    public Id: string;
    // data for remove movie
    constructor(
        id: string) {
        this.Id = id;
    }
}
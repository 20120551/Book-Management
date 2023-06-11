import { ICommand, AutoMaping } from '@movie/shared';

export default class RemoveCart implements ICommand {
    @AutoMaping
    public Id: string;
    // data for remove Cart
    constructor(
        id: string) {
        this.Id = id;
    }
}
import { ICommand } from '@Shared/Commands';
import { Localization } from '@Application/Utils';
import { AutoMaping } from '@Shared/AutoMapper';

export default class UpdateMovie implements ICommand {
    // data for update movie
    @AutoMaping
    public Id: string;

    @AutoMaping
    public Name: string;

    @AutoMaping
    public Status: string;

    @AutoMaping
    public Slot: number;

    @AutoMaping
    public Price: number;

    @AutoMaping
    public Localization: Localization;
    // data for create movie
    constructor(
        id: string,
        name: string, status: string, slot: number, price: number, localization: Localization) {
        this.Id = id;
        this.Name = name;
        this.Status = status;
        this.Slot = slot;
        this.Price = price;
        this.Localization = localization;
    }
}
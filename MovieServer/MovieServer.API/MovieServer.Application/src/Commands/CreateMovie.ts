import { ICommand } from '@Shared/Commands';
import { Localization } from '@Application/Utils';
import { AutoMaping } from "@Shared/AutoMapper"

export default class CreateMovie implements ICommand {
    @AutoMaping
    public Id: string = `MV_${Date.now()}`;

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
    constructor(name: string, status: string, slot: number, price: number, localization: Localization) {
        this.Name = name;
        this.Status = status;
        this.Slot = slot;
        this.Price = price;
        this.Localization = localization;
    }
}
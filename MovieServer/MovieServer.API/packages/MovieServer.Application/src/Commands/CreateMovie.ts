import { AutoMaping, ICommand } from '@movie/shared';
import { Localization } from '../Utils';
import { v4 as uuidv4 } from 'uuid';

export default class CreateMovie implements ICommand {
    @AutoMaping
    public Id: string = uuidv4();

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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MovieReadDto {
    /**
     *
     */
    constructor(Id, Name, Status, 
    //price
    Slot, 
    //price
    Price, Localization, Actors) {
        this.Id = Id;
        this.Name = Name;
        this.Localization = Localization;
        this.Actors = Actors;
        this.Status = Status;
        this.Price = Price;
        this.Slot = Slot;
    }
}
exports.default = MovieReadDto;

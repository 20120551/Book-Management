export default class MovieReadDto {
    Id: string;
    Name: string;
    Status: String;
    //price
    Slot: number;
    //price
    Price: number;
    Localization: {
        District: String,
        City: String
    };
    Actors: {
        Name: String,
        Role: String,
    }[]

    /**
     *
     */
    constructor(
        Id: string,
        Name: string,
        Status: String,
        //price
        Slot: number,
        //price
        Price: number,
        Localization: {
            District: String,
            City: String
        },
        Actors: {
            Name: String,
            Role: String
        }[]
    ) {
        this.Id = Id;
        this.Name = Name;
        this.Localization = Localization;
        this.Actors = Actors;
        this.Status = Status;
        this.Price = Price;
        this.Slot = Slot;
    }
}
export default class MovieReadDto {
    Id: string;
    Name: string;
    Status: String;
    Slot: number;
    Price: number;
    Localization: {
        District: String;
        City: String;
    };
    Actors: {
        Name: String;
        Role: String;
    }[];
    /**
     *
     */
    constructor(Id: string, Name: string, Status: String, Slot: number, Price: number, Localization: {
        District: String;
        City: String;
    }, Actors: {
        Name: String;
        Role: String;
    }[]);
}
//# sourceMappingURL=MovieReadDto.d.ts.map
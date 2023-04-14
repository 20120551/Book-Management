export default class CartReadDto {
    Id: string;
    MovieItems: {
        Id: string;
        Name: string;
        Price: number;
        Seat: string;
        Quantity: number;
    }[];
    /**
     *
     */
    constructor(Id: string, MovieItems: {
        Id: string;
        Name: string;
        Price: number;
        Seat: string;
        Quantity: number;
    }[]);
}
//# sourceMappingURL=CartReadDto.d.ts.map
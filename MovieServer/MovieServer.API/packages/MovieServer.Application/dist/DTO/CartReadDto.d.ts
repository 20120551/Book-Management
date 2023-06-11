export default class CartReadDto {
    Id: string;
    Receiver: {
        FullName: string;
        PhoneNumber: string;
        Address: string;
    };
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
    constructor(Id: string, Receiver: {
        FullName: string;
        PhoneNumber: string;
        Address: string;
    }, MovieItems: {
        Id: string;
        Name: string;
        Price: number;
        Seat: string;
        Quantity: number;
    }[]);
}

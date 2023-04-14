export default class CartReadDto {
    /**
     *
     */
    constructor(
        public Id: string,
        public MovieItems: {
            Id: string,
            Name: string,
            Price: number,
            Seat: string,
            Quantity: number
        }[]
    ) {

    }
}
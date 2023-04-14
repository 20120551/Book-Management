import { EmptySeatException, InvalidQuantityException } from "@Domain/Exceptions";

export default class Seat {
    public Value: string;

    constructor(seat: string) {
        if (seat === "") {
            throw new EmptySeatException();
        }
        this.Value = seat;
    }

    public Change(seat: string) {
        if (seat === "") {
            throw new EmptySeatException();
        }
        this.Value = seat;
    }


    public static Create(seat: string): Seat { return new Seat(seat); }
}
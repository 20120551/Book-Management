import { InvalidQuantityException } from "@Domain/Exceptions";

export default class Quantity {
    public Value: number;

    constructor(quantity: number) {
        if (quantity < 0) {
            throw new InvalidQuantityException(quantity);
        }
        this.Value = quantity;
    }
    public Increase(quantity: number) {
        this.Value += quantity;
    }
    public Decrease(quantity: number) {
        const temp: number = this.Value - quantity;
        if (temp < 0) {
            throw new InvalidQuantityException(temp);
        }
        this.Value = temp;
    }
    public Change(quantity: number) {
        if (quantity < 0) {
            throw new InvalidQuantityException(quantity);
        }
        this.Value = quantity;
    }


    public static Create(quantity: number): Quantity { return new Quantity(quantity); }
}
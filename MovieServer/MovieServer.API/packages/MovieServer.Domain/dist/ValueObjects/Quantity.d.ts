export default class Quantity {
    Value: number;
    constructor(quantity: number);
    Increase(quantity: number): void;
    Decrease(quantity: number): void;
    Change(quantity: number): void;
    static Create(quantity: number): Quantity;
}

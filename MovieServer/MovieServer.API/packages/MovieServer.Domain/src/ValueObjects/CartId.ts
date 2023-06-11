import { EmptyCartIdException } from "../Exceptions";

export default class CartId {
    public Guid: string;

    constructor(id: string) {
        if (id === "") {
            throw new EmptyCartIdException();
        }
        this.Guid = id;
    }

    public static Create(id: string): CartId { return new CartId(id); }
}
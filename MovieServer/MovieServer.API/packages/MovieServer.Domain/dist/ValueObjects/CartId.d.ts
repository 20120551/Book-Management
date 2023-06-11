export default class CartId {
    Guid: string;
    constructor(id: string);
    static Create(id: string): CartId;
}

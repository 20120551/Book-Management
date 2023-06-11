import { ICommand } from "@movie/shared";
export default class UpdateReceiverFromCart implements ICommand {
    CartId: string;
    FullName: string;
    PhoneNumber: string;
    Address: string;
    constructor(CartId: string, FullName: string, PhoneNumber: string, Address: string);
}

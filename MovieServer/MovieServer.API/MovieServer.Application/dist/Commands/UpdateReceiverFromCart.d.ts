import { ICommand } from "@Shared/Commands";
export default class UpdateReceiverFromCart implements ICommand {
    CartId: string;
    FullName: string;
    PhoneNumber: string;
    Address: string;
    constructor(CartId: string, FullName: string, PhoneNumber: string, Address: string);
}
//# sourceMappingURL=UpdateReceiverFromCart.d.ts.map
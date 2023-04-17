import { ICommand } from "@Shared/Commands";
export default class AddReceiverToCart implements ICommand {
    CartId: string;
    FullName: string;
    PhoneNumber: string;
    Address: string;
    constructor(CartId: string, FullName: string, PhoneNumber: string, Address: string);
}
//# sourceMappingURL=AddReceiverToCart.d.ts.map
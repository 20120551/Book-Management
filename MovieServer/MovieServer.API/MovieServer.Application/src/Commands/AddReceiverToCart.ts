import { ICommand } from "@Shared/Commands";

export default class AddReceiverToCart implements ICommand {
    constructor(
        public CartId: string,
        public FullName: string,
        public PhoneNumber: string,
        public Address: string
    ) {

    }
}
import { ICommand } from "@movie/shared";
export default class AddReceiverToCart implements ICommand {
    constructor(
        public CartId: string,
        public FullName: string,
        public PhoneNumber: string,
        public Address: string
    ) {

    }
}
import { ICommand } from "@payment/common";

export class CreatePayment implements ICommand {

    constructor(
        public orderId: string,
        public userId: string,
        public payType: string,
    ) {

    }
}
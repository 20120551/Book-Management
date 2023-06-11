import { ICommand } from "@payment/common";

export class SuccessPayingCommand implements ICommand {
    constructor(
        public paymentId: string,
        public version: number) {

    }
}
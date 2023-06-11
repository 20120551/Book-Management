import { ICommand } from "@payment/common";

export class FailPayingCommand implements ICommand {
    constructor(
        public paymentId: string,
        public message: string,
        public version: number
    ) {

    }
}
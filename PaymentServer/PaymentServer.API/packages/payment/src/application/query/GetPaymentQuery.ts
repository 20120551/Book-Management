import { IQuery } from "@payment/common/src";

export class GetPaymentQuery implements IQuery<any>
{
    constructor(
        public paymentId: string
    ) {

    }
}
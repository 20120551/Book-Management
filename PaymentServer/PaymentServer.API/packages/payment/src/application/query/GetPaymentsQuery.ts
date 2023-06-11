import { IQuery } from "@payment/common/src";

export class GetPaymentsQuery implements IQuery<any>
{
    constructor(
        public state: string
    ) {

    }
}
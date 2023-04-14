import { IQuery } from "@Shared/Queries";

export default class GetCart implements IQuery<any>
{
    constructor(
        public Id: string
    ) {

    }
}
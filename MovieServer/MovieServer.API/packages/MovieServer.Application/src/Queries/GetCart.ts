import { IQuery } from "@movie/shared";

export default class GetCart implements IQuery<any>
{
    constructor(
        public Id: string
    ) {

    }
}
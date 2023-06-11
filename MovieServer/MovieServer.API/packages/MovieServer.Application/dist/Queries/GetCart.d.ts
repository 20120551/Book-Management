import { IQuery } from "@movie/shared";
export default class GetCart implements IQuery<any> {
    Id: string;
    constructor(Id: string);
}

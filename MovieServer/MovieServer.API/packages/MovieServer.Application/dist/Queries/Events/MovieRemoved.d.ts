import { IQuery } from "@movie/shared";
export default class MovieRemoved implements IQuery<void> {
    Id: string;
    constructor(Id: string);
}

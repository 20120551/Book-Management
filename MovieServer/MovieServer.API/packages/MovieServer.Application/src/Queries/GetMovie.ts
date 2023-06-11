import { IQuery } from "@movie/shared";
import { MovieReadDto } from "../DTO";

export default class GetMovie implements IQuery<MovieReadDto>
{
    // information for query

    constructor(
        public Id: string = "") {

    }
}
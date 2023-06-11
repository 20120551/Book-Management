import { IQuery } from "@movie/shared";
import { MovieReadDto } from "../DTO";
export default class GetMovie implements IQuery<MovieReadDto> {
    Id: string;
    constructor(Id?: string);
}

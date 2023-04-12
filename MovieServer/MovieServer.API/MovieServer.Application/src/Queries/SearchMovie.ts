import { IQuery } from "@Shared/Queries";
import { MovieReadDto } from "@Application/DTO";

export default class SearchMovie implements IQuery<MovieReadDto>
{
    constructor(public SearchPhase: string = "") {

    }
}
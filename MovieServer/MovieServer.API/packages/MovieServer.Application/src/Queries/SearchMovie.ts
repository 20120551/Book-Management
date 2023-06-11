import { IQuery } from "@movie/shared";
import { MovieReadDto } from "../DTO";

export default class SearchMovie implements IQuery<MovieReadDto>
{
    constructor(public SearchPhase: string = "") {

    }
}
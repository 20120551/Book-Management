import { IQuery } from "@movie/shared";
import { MovieReadDto } from "../DTO";
export default class SearchMovie implements IQuery<MovieReadDto> {
    SearchPhase: string;
    constructor(SearchPhase?: string);
}

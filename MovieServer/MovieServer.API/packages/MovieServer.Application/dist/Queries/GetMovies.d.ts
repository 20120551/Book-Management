import { IQuery } from "@movie/shared";
import { MovieReadDto } from "../DTO";
export default class GetMovies implements IQuery<MovieReadDto> {
    Page: number;
    Take: number;
    constructor(Page: number, Take: number);
}

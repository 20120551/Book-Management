import { IQuery } from "@movie/shared";
import { MovieReadDto } from "../DTO";

export default class GetMovies implements IQuery<MovieReadDto>
{
    // information for query

    constructor(
        public Page: number,
        public Take: number) {

    }
}
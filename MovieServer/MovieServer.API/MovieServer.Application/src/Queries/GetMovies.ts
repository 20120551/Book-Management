import { IQuery } from "@Shared/Queries";
import { MovieReadDto } from "@Application/DTO";

export default class GetMovies implements IQuery<MovieReadDto>
{
    // information for query

    constructor(
        public Page: number,
        public Take: number) {

    }
}
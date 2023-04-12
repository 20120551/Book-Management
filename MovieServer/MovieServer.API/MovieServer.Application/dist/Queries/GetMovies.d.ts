import { IQuery } from "@Shared/Queries";
import { MovieReadDto } from "@Application/DTO";
export default class GetMovie implements IQuery<MovieReadDto> {
    Page: number;
    Take: number;
    constructor(Page: number, Take: number);
}
//# sourceMappingURL=GetMovies.d.ts.map
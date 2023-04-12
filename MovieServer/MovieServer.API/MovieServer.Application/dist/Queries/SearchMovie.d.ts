import { IQuery } from "@Shared/Queries";
import { MovieReadDto } from "@Application/DTO";
export default class SearchMovie implements IQuery<MovieReadDto> {
    SearchPhase: string;
    constructor(SearchPhase?: string);
}
//# sourceMappingURL=SearchMovie.d.ts.map
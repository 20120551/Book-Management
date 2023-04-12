import { IQuery } from "@Shared/Queries";
import { MovieReadDto } from "@Application/DTO";
export default class GetMovie implements IQuery<MovieReadDto> {
    Id: string;
    constructor(Id?: string);
}
//# sourceMappingURL=GetMovie.d.ts.map
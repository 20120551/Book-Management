import mongoose from "mongoose";
import { IQueryHandler } from "@Shared/Queries";
import { SearchMovie } from "@Application/Queries";
import { MovieReadDto } from "@Application/DTO";
import { DbClient } from "@Infrastructure/Read/Queries";
export declare type ISearchMovieHandler = IQueryHandler<SearchMovie, MovieReadDto[]>;
export interface IMovieModel extends mongoose.Document, MovieReadDto {
}
export default class SearchMovieHandler implements IQueryHandler<SearchMovie, MovieReadDto[]> {
    private readonly _model;
    constructor(dbClient: DbClient);
    HandleAsync(query: SearchMovie): Promise<MovieReadDto[] | null>;
}
//# sourceMappingURL=SearchMovieHandler.d.ts.map
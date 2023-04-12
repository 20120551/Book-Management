import mongoose from "mongoose";
import { IQueryHandler } from "@Shared/Queries";
import { GetMovies } from "@Application/Queries";
import { MovieReadDto } from "@Application/DTO";
import { DbClient } from "@Infrastructure/Read/Queries";
export declare type IGetMoviesHandler = IQueryHandler<GetMovies, MovieReadDto[]>;
export interface IMovieModel extends mongoose.Document, MovieReadDto {
}
export default class GetMoviesHandler implements IGetMoviesHandler {
    private readonly _model;
    constructor(dbClient: DbClient);
    HandleAsync(query: GetMovies): Promise<MovieReadDto[] | null>;
}
//# sourceMappingURL=GetMoviesHandler.d.ts.map
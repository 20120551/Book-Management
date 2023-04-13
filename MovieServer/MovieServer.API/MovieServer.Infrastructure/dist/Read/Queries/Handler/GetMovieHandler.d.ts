import mongoose from "mongoose";
import { IQueryHandler } from "@Shared/Queries";
import { GetMovie } from "@Application/Queries";
import { MovieReadDto } from "@Application/DTO";
import { DbClient } from "@Infrastructure/Read/Queries";
export declare type IGetMovieHandler = IQueryHandler<GetMovie, MovieReadDto>;
export interface IMovieModel extends mongoose.Document, MovieReadDto {
}
export default class GetMovieHandler implements IGetMovieHandler {
    private readonly _model;
    constructor(dbClient: DbClient);
    HandleAsync(query: GetMovie): Promise<MovieReadDto | null>;
}
//# sourceMappingURL=GetMovieHandler.d.ts.map
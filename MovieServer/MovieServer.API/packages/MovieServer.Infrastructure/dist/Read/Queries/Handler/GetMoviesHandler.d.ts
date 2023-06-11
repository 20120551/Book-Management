import { GetMovies, MovieReadDto } from "@movie/application";
import { IQueryHandler } from "@movie/shared";
import mongoose from "mongoose";
import { DbClientReadSide } from "../DbClient";
export type IGetMoviesHandler = IQueryHandler<GetMovies, MovieReadDto[]>;
export interface IMovieModel extends mongoose.Document, MovieReadDto {
}
export default class GetMoviesHandler implements IGetMoviesHandler {
    private readonly _model;
    constructor(dbClient: DbClientReadSide);
    HandleAsync(query: GetMovies): Promise<MovieReadDto[] | null>;
}

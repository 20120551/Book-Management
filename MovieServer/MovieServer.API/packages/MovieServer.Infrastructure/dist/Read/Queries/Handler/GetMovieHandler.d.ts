import mongoose from "mongoose";
import { GetMovie, MovieReadDto } from "@movie/application";
import { IQueryHandler } from "@movie/shared";
import { DbClientReadSide } from "../DbClient";
export type IGetMovieHandler = IQueryHandler<GetMovie, MovieReadDto>;
export interface IMovieModel extends mongoose.Document, MovieReadDto {
}
export default class GetMovieHandler implements IGetMovieHandler {
    private readonly _model;
    constructor(dbClient: DbClientReadSide);
    HandleAsync(query: GetMovie): Promise<MovieReadDto | null>;
}

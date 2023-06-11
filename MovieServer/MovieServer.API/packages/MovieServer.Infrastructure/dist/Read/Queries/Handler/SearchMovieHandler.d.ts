import mongoose from "mongoose";
import { MovieReadDto, SearchMovie } from "@movie/application";
import { IQueryHandler } from "@movie/shared";
import { DbClientReadSide } from "../DbClient";
export type ISearchMovieHandler = IQueryHandler<SearchMovie, MovieReadDto[]>;
export interface IMovieModel extends mongoose.Document, MovieReadDto {
}
export default class SearchMovieHandler implements IQueryHandler<SearchMovie, MovieReadDto[]> {
    private readonly _model;
    constructor(dbClient: DbClientReadSide);
    HandleAsync(query: SearchMovie): Promise<MovieReadDto[] | null>;
}

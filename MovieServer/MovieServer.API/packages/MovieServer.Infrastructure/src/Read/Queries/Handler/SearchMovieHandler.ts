import mongoose, { Model, Schema } from "mongoose";
import { MovieReadDto, SearchMovie } from "@movie/application";
import { } from "@movie/domain";
import { IQueryHandler, Injectable, ReadDbClient } from "@movie/shared";
import { DbClientReadSide } from "../DbClient";
import { MovieSchema } from "../../Models/Schema";

export type ISearchMovieHandler = IQueryHandler<SearchMovie, MovieReadDto[]>;
export interface IMovieModel extends mongoose.Document, MovieReadDto { };

@Injectable
export default class SearchMovieHandler
    implements IQueryHandler<SearchMovie, MovieReadDto[]> {

    private readonly _model: Model<IMovieModel>;

    constructor(
        @ReadDbClient dbClient: DbClientReadSide
    ) {
        this._model = dbClient.model<IMovieModel>("Movie", MovieSchema);
    }

    async HandleAsync(query: SearchMovie): Promise<MovieReadDto[] | null> {
        if (query.SearchPhase === "") {
            return null;
        }
        var result = await this._model.find({
            Name: {
                $regex: `.*${query.SearchPhase}.*`,
                $options: "i"
            }
        });
        return result;
    }
}
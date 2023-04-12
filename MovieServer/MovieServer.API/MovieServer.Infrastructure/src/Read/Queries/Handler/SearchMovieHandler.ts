import mongoose, { Model, Schema } from "mongoose";
import { IQueryHandler } from "@Shared/Queries";
import { SearchMovie } from "@Application/Queries";
import { MovieReadDto } from "@Application/DTO";
import { ReadDbClient, Injectable } from "@Shared/IoC";
import { MovieSchema } from "@Infrastructure/Read/Models/Schema";
import { DbClient } from "@Infrastructure/Read/Queries";

export type ISearchMovieHandler = IQueryHandler<SearchMovie, MovieReadDto[]>;
export interface IMovieModel extends mongoose.Document, MovieReadDto { };

@Injectable
export default class SearchMovieHandler
    implements IQueryHandler<SearchMovie, MovieReadDto[]> {

    private readonly _model: Model<IMovieModel>;

    constructor(
        @ReadDbClient dbClient: DbClient
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
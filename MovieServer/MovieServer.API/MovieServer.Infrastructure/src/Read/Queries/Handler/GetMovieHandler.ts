import mongoose, { Model } from "mongoose";
import { IQueryHandler } from "@Shared/Queries";
import { GetMovie } from "@Application/Queries";
import { MovieReadDto } from "@Application/DTO";
import { ReadDbClient, Injectable } from "@Shared/IoC";
import { DbClient } from "@Infrastructure/Read/Queries";
import { MovieSchema } from "@Infrastructure/Read/Models/Schema";

// movieModel
export type IGetMovieHandler = IQueryHandler<GetMovie, MovieReadDto>;
export interface IMovieModel extends mongoose.Document, MovieReadDto { };

@Injectable
export default class GetMovieHandler
    implements IQueryHandler<GetMovie, MovieReadDto> {

    private readonly _model: Model<IMovieModel>;
    constructor(
        @ReadDbClient dbClient: DbClient
    ) {
        this._model = dbClient.model<IMovieModel>("Movie", MovieSchema);
    }

    async HandleAsync(query: GetMovie): Promise<MovieReadDto | null> {
        var result = await this._model.findOne({ Id: query.Id });
        // automapper map result
        return result;
    }
}
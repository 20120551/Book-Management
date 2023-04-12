import mongoose, { Model, Schema } from "mongoose";
import { IQueryHandler } from "@Shared/Queries";
import { GetMovies } from "@Application/Queries";
import { MovieReadDto } from "@Application/DTO";
import { ReadDbClient, Injectable } from "@Shared/IoC";
import { DbClient } from "@Infrastructure/Read/Queries";
import { MovieSchema } from "@Infrastructure/Read/Models/Schema";

// movieModel
export type IGetMoviesHandler = IQueryHandler<GetMovies, MovieReadDto[]>;
export interface IMovieModel extends mongoose.Document, MovieReadDto { };

@Injectable
export default class GetMoviesHandler
    implements IGetMoviesHandler {

    private readonly _model: Model<IMovieModel>;
    constructor(
        @ReadDbClient dbClient: DbClient
    ) {
        this._model = dbClient.model<IMovieModel>("Movie", MovieSchema);
    }

    async HandleAsync(query: GetMovies): Promise<MovieReadDto[] | null> {
        const { Page, Take } = query;
        var result = await this._model.find().skip(Page * Take).limit(Take);
        // automapper map result
        return result;
    }
}
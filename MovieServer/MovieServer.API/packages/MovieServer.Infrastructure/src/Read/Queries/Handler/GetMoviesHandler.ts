import { GetMovies, MovieReadDto } from "@movie/application";
import { } from "@movie/domain";
import { IQueryHandler, Injectable, ReadDbClient } from "@movie/shared";
import mongoose, { Model } from "mongoose";
import { DbClientReadSide } from "../DbClient";
import { MovieSchema } from "../../Models/Schema";

// movieModel
export type IGetMoviesHandler = IQueryHandler<GetMovies, MovieReadDto[]>;
export interface IMovieModel extends mongoose.Document, MovieReadDto { };

@Injectable
export default class GetMoviesHandler
    implements IGetMoviesHandler {

    private readonly _model: Model<IMovieModel>;
    constructor(
        @ReadDbClient dbClient: DbClientReadSide
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
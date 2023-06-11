import mongoose, { Model } from "mongoose";
import { GetMovie, MovieReadDto } from "@movie/application";
import { } from "@movie/domain";
import { IQueryHandler, Injectable, ReadDbClient } from "@movie/shared";
import { DbClientReadSide } from "../DbClient";
import { MovieSchema } from "../../Models/Schema";
import { NotFoundMovieException } from "../Exceptions";

// movieModel
export type IGetMovieHandler = IQueryHandler<GetMovie, MovieReadDto>;
export interface IMovieModel extends mongoose.Document, MovieReadDto { };

@Injectable
export default class GetMovieHandler
    implements IGetMovieHandler {

    private readonly _model: Model<IMovieModel>;
    constructor(
        @ReadDbClient dbClient: DbClientReadSide
    ) {
        this._model = dbClient.model<IMovieModel>("Movie", MovieSchema);
    }

    async HandleAsync(query: GetMovie): Promise<MovieReadDto | null> {
        var result = await this._model.findOne({ Id: query.Id });
        // automapper map result
        if (result === null) {
            throw new NotFoundMovieException();
        }
        return result;
    }
}
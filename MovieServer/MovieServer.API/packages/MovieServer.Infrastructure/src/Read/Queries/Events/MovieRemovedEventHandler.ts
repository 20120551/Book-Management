import { MovieRemoved } from "@movie/application";
import { } from "@movie/domain";
import { IQueryHandler, Injectable, ReadDbClient } from "@movie/shared";
import mongoose, { Model } from "mongoose";
import { DbClientReadSide } from "../DbClient";
import { MovieSchema } from "../../Models/Schema";

export type IMovieRemovedEventHandler = IQueryHandler<MovieRemoved, void>;
export interface IMovieModel extends mongoose.Document { };

@Injectable
export default class MovieRemovedEventHandler implements IMovieRemovedEventHandler {
    private readonly _model: Model<IMovieModel>;
    constructor(
        @ReadDbClient dbClient: DbClientReadSide
    ) {
        this._model = dbClient.model<IMovieModel>("Movie", MovieSchema);

        //bind
        this.HandleAsync = this.HandleAsync.bind(this);
    }
    async HandleAsync(query: MovieRemoved): Promise<void | null> {
        console.log("event handled on MovieRemovedEventHandler");
        const { Id } = query;
        await this._model.deleteOne({ Id: Id });
    }

}
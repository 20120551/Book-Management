import { IQueryHandler } from "@Shared/Queries";
import { MovieRemoved } from "@Application/Queries/Events";
import { Injectable, ReadDbClient } from "@Shared/IoC";
import { MovieSchema } from "@Infrastructure/Read/Models/Schema";
import mongoose, { Model } from "mongoose";
import { DbClient } from "@Infrastructure/Read/Queries";

export type IMovieRemovedEventHandler = IQueryHandler<MovieRemoved, void>;
export interface IMovieModel extends mongoose.Document { };

@Injectable
export default class MovieRemovedEventHandler implements IMovieRemovedEventHandler {
    private readonly _model: Model<IMovieModel>;
    constructor(
        @ReadDbClient dbClient: DbClient
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
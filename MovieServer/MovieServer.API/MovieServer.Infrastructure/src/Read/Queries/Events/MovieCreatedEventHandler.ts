import { IQueryHandler } from "@Shared/Queries";
import { MovieCreated } from "@Application/Queries/Events";
import { Injectable, ReadDbClient } from "@Shared/IoC";
import { MovieSchema } from "@Infrastructure/Read/Models/Schema";
import mongoose, { Model } from "mongoose";
import { DbClient } from "@Infrastructure/Read/Queries";

export type IMovieCreatedEventHandler = IQueryHandler<MovieCreated, void>;
export interface IMovieModel extends mongoose.Document { };

@Injectable
export default class MovieCreatedEventHandler implements IMovieCreatedEventHandler {
    private readonly _model: Model<IMovieModel>;
    constructor(
        @ReadDbClient dbClient: DbClient
    ) {
        this._model = dbClient.model<IMovieModel>("Movie", MovieSchema);

        //bind
        this.HandleAsync = this.HandleAsync.bind(this);
    }
    async HandleAsync(query: MovieCreated): Promise<void | null> {
        console.log("event handled on MovieCreatedEventHandler");
        await this._model.create({ ...query });
    }

}
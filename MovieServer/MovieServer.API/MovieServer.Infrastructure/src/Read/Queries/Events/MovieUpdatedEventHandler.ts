import { IQueryHandler } from "@Shared/Queries";
import { MovieUpdated } from "@Application/Queries/Events";
import { Injectable, ReadDbClient } from "@Shared/IoC";
import { MovieSchema } from "@Infrastructure/Read/Models/Schema";
import mongoose, { Model } from "mongoose";
import { DbClient } from "@Infrastructure/Read/Queries";

export type IMovieUpdatedEventHandler = IQueryHandler<MovieUpdated, void>;
export interface IMovieModel extends mongoose.Document { };

@Injectable
export default class MovieUpdatedEventHandler implements IMovieUpdatedEventHandler {
    private readonly _model: Model<IMovieModel>;
    constructor(
        @ReadDbClient dbClient: DbClient
    ) {
        this._model = dbClient.model<IMovieModel>("Movie", MovieSchema);

        //bind
        this.HandleAsync = this.HandleAsync.bind(this);
    }
    async HandleAsync(query: MovieUpdated): Promise<void | null> {
        console.log("event handled on MovieUpdatedEventHandler");
        const { Id, Name, Status, Localization, Price, Slot } = query;
        await this._model.updateOne({ Id: Id }, {
            $set: {
                Name, Status, Localization, Price, Slot
            }
        });
    }

}
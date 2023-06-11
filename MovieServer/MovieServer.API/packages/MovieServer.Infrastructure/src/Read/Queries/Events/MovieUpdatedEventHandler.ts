import { MovieUpdated } from "@movie/application";
import { } from "@movie/domain";
import { IQueryHandler, Injectable, ReadDbClient } from "@movie/shared";
import mongoose, { Model } from "mongoose";
import { DbClientReadSide } from "../DbClient";
import { MovieSchema } from "../../Models/Schema";

export type IMovieUpdatedEventHandler = IQueryHandler<MovieUpdated, void>;
export interface IMovieModel extends mongoose.Document { };

@Injectable
export default class MovieUpdatedEventHandler implements IMovieUpdatedEventHandler {
    private readonly _model: Model<IMovieModel>;
    constructor(
        @ReadDbClient dbClient: DbClientReadSide
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
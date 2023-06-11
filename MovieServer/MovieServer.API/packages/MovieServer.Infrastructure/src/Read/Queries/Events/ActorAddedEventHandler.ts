import { ActorAdded } from "@movie/application";
import { } from "@movie/domain";
import { IQueryHandler, Injectable, ReadDbClient } from "@movie/shared";
import mongoose, { Model } from "mongoose";
import { DbClientReadSide } from "../DbClient";
import { MovieSchema } from "../../Models/Schema";

export type IActorAddedEventHandler = IQueryHandler<ActorAdded, void>;
export interface IMovieModel extends mongoose.Document { };

@Injectable
export default class ActorAddedEventHandler implements IActorAddedEventHandler {
    private readonly _model: Model<IMovieModel>;
    constructor(
        @ReadDbClient dbClient: DbClientReadSide
    ) {
        this._model = dbClient.model<IMovieModel>("Movie", MovieSchema);

        //bind
        this.HandleAsync = this.HandleAsync.bind(this);
    }
    async HandleAsync(query: ActorAdded): Promise<void | null> {
        console.log("event handled on ActorAddedEventHandler");
        const { Id, Name, Role, ActorId } = query;
        await this._model.updateOne({ Id: Id }, {
            $push: {
                Actors: { Name, Role, Id: ActorId }
            }
        })
    }

}
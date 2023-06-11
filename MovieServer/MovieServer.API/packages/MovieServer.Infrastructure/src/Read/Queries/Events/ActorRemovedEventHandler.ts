import { ActorRemoved } from "@movie/application";
import { } from "@movie/domain";
import { IQueryHandler, Injectable, ReadDbClient } from "@movie/shared";
import mongoose, { Model } from "mongoose";
import { DbClientReadSide } from "../DbClient";
import { MovieSchema } from "../../Models/Schema";
export type IActorRemovedEventHandler = IQueryHandler<ActorRemoved, void>
export interface IMovieModel extends mongoose.Document { };

@Injectable
export default class ActorRemovedEventHandler implements IActorRemovedEventHandler {
    private readonly _model: Model<IMovieModel>;
    constructor(
        @ReadDbClient dbClient: DbClientReadSide
    ) {
        this._model = dbClient.model<IMovieModel>("Movie", MovieSchema);

        //bind
        this.HandleAsync = this.HandleAsync.bind(this);
    }
    async HandleAsync(query: ActorRemoved): Promise<void | null> {
        console.log("event handled on ActorRemovedEventHandler");
        const { Id, ActorId } = query;
        await this._model.updateOne({ Id: Id }, {
            $pull: {
                Actors: { Id: ActorId }
            }
        })
    }

}
import { IQueryHandler } from "@Shared/Queries";
import { ActorRemoved } from "@Application/Queries/Events";
import { Injectable, ReadDbClient } from "@Shared/IoC";
import { MovieSchema } from "@Infrastructure/Read/Models/Schema";
import mongoose, { Model } from "mongoose";
import { DbClient } from "@Infrastructure/Read/Queries";

export type IActorRemovedEventHandler = IQueryHandler<ActorRemoved, void>
export interface IMovieModel extends mongoose.Document { };

@Injectable
export default class ActorRemovedEventHandler implements IActorRemovedEventHandler {
    private readonly _model: Model<IMovieModel>;
    constructor(
        @ReadDbClient dbClient: DbClient
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
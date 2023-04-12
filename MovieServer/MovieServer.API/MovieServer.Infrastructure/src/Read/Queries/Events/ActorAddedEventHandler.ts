import { IQueryHandler } from "@Shared/Queries";
import { ActorAdded } from "@Application/Queries/Events";
import { Injectable, ReadDbClient } from "@Shared/IoC";
import { MovieSchema } from "@Infrastructure/Read/Models/Schema";
import mongoose, { Model } from "mongoose";
import { DbClient } from "@Infrastructure/Read/Queries";

export type IActorAddedEventHandler = IQueryHandler<ActorAdded, void>;
export interface IMovieModel extends mongoose.Document { };

@Injectable
export default class ActorAddedEventHandler implements IActorAddedEventHandler {
    private readonly _model: Model<IMovieModel>;
    constructor(
        @ReadDbClient dbClient: DbClient
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
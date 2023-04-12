import { IQueryHandler } from "@Shared/Queries";
import { ActorAdded } from "@Application/Queries/Events";
import mongoose from "mongoose";
import { DbClient } from "@Infrastructure/Read/Queries";
export declare type IActorAddedEventHandler = IQueryHandler<ActorAdded, void>;
export interface IMovieModel extends mongoose.Document {
}
export default class ActorAddedEventHandler implements IActorAddedEventHandler {
    private readonly _model;
    constructor(dbClient: DbClient);
    HandleAsync(query: ActorAdded): Promise<void | null>;
}
//# sourceMappingURL=ActorAddedEventHandler.d.ts.map
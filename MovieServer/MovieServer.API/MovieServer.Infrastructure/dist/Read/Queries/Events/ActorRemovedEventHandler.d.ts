import { IQueryHandler } from "@Shared/Queries";
import { ActorRemoved } from "@Application/Queries/Events";
import mongoose from "mongoose";
import { DbClient } from "@Infrastructure/Read/Queries";
export declare type IActorRemovedEventHandler = IQueryHandler<ActorRemoved, void>;
export interface IMovieModel extends mongoose.Document {
}
export default class ActorRemovedEventHandler implements IActorRemovedEventHandler {
    private readonly _model;
    constructor(dbClient: DbClient);
    HandleAsync(query: ActorRemoved): Promise<void | null>;
}
//# sourceMappingURL=ActorRemovedEventHandler.d.ts.map
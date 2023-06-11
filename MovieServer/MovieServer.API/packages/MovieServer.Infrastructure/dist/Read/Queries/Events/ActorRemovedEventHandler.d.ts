import { ActorRemoved } from "@movie/application";
import { IQueryHandler } from "@movie/shared";
import mongoose from "mongoose";
import { DbClientReadSide } from "../DbClient";
export type IActorRemovedEventHandler = IQueryHandler<ActorRemoved, void>;
export interface IMovieModel extends mongoose.Document {
}
export default class ActorRemovedEventHandler implements IActorRemovedEventHandler {
    private readonly _model;
    constructor(dbClient: DbClientReadSide);
    HandleAsync(query: ActorRemoved): Promise<void | null>;
}

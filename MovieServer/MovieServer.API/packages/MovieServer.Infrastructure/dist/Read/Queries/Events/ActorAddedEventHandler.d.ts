import { ActorAdded } from "@movie/application";
import { IQueryHandler } from "@movie/shared";
import mongoose from "mongoose";
import { DbClientReadSide } from "../DbClient";
export type IActorAddedEventHandler = IQueryHandler<ActorAdded, void>;
export interface IMovieModel extends mongoose.Document {
}
export default class ActorAddedEventHandler implements IActorAddedEventHandler {
    private readonly _model;
    constructor(dbClient: DbClientReadSide);
    HandleAsync(query: ActorAdded): Promise<void | null>;
}

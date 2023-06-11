import { MovieUpdated } from "@movie/application";
import { IQueryHandler } from "@movie/shared";
import mongoose from "mongoose";
import { DbClientReadSide } from "../DbClient";
export type IMovieUpdatedEventHandler = IQueryHandler<MovieUpdated, void>;
export interface IMovieModel extends mongoose.Document {
}
export default class MovieUpdatedEventHandler implements IMovieUpdatedEventHandler {
    private readonly _model;
    constructor(dbClient: DbClientReadSide);
    HandleAsync(query: MovieUpdated): Promise<void | null>;
}

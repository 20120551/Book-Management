import { MovieCreated } from "@movie/application";
import { IQueryHandler } from "@movie/shared";
import mongoose from "mongoose";
import { DbClientReadSide } from "../DbClient";
export type IMovieCreatedEventHandler = IQueryHandler<MovieCreated, void>;
export interface IMovieModel extends mongoose.Document {
}
export default class MovieCreatedEventHandler implements IMovieCreatedEventHandler {
    private readonly _model;
    constructor(dbClient: DbClientReadSide);
    HandleAsync(query: MovieCreated): Promise<void | null>;
}

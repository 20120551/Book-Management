import { MovieRemoved } from "@movie/application";
import { IQueryHandler } from "@movie/shared";
import mongoose from "mongoose";
import { DbClientReadSide } from "../DbClient";
export type IMovieRemovedEventHandler = IQueryHandler<MovieRemoved, void>;
export interface IMovieModel extends mongoose.Document {
}
export default class MovieRemovedEventHandler implements IMovieRemovedEventHandler {
    private readonly _model;
    constructor(dbClient: DbClientReadSide);
    HandleAsync(query: MovieRemoved): Promise<void | null>;
}

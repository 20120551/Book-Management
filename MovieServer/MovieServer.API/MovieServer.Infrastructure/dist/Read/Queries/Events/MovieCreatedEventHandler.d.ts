import { IQueryHandler } from "@Shared/Queries";
import { MovieCreated } from "@Application/Queries/Events";
import mongoose from "mongoose";
import { DbClient } from "@Infrastructure/Read/Queries";
export declare type IMovieCreatedEventHandler = IQueryHandler<MovieCreated, void>;
export interface IMovieModel extends mongoose.Document {
}
export default class MovieCreatedEventHandler implements IMovieCreatedEventHandler {
    private readonly _model;
    constructor(dbClient: DbClient);
    HandleAsync(query: MovieCreated): Promise<void | null>;
}
//# sourceMappingURL=MovieCreatedEventHandler.d.ts.map
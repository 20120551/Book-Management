import { IQueryHandler } from "@Shared/Queries";
import { MovieUpdated } from "@Application/Queries/Events";
import mongoose from "mongoose";
import { DbClient } from "@Infrastructure/Read/Queries";
export declare type IMovieUpdatedEventHandler = IQueryHandler<MovieUpdated, void>;
export interface IMovieModel extends mongoose.Document {
}
export default class MovieUpdatedEventHandler implements IMovieUpdatedEventHandler {
    private readonly _model;
    constructor(dbClient: DbClient);
    HandleAsync(query: MovieUpdated): Promise<void | null>;
}
//# sourceMappingURL=MovieUpdatedEventHandler.d.ts.map
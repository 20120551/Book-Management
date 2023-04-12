import { IQueryHandler } from "@Shared/Queries";
import { MovieRemoved } from "@Application/Queries/Events";
import mongoose from "mongoose";
import { DbClient } from "@Infrastructure/Read/Queries";
export declare type IMovieRemovedEventHandler = IQueryHandler<MovieRemoved, void>;
export interface IMovieModel extends mongoose.Document {
}
export default class MovieRemovedEventHandler implements IMovieRemovedEventHandler {
    private readonly _model;
    constructor(dbClient: DbClient);
    HandleAsync(query: MovieRemoved): Promise<void | null>;
}
//# sourceMappingURL=MovieRemovedEventHandler.d.ts.map
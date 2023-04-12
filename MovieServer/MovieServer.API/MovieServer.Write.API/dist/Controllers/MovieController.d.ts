import { ICreateMovieHandler, IUpdateMovieHandler, IRemoveMovieHandler, IRemoveActorFromMovieHandler, IAddActorToMovieHandler } from "@Application/Commands/Handler";
import express from "express";
export default class MovieController {
    private readonly _createMovieHandler;
    private readonly _updateMovieHandler;
    private readonly _removeMovieHandler;
    private readonly _removeActorFromMovieHandler;
    private readonly _addActorToMovieHandler;
    constructor(createMovieHandler: ICreateMovieHandler, updateMovieHandler: IUpdateMovieHandler, removeMovieHandler: IRemoveMovieHandler, removeActorFromMovieHandler: IRemoveActorFromMovieHandler, addActorToMovieHandler: IAddActorToMovieHandler);
    Create(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    Update(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response<any, Record<string, any>>>;
    Delete(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    AddActor(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    RemoveActor(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}
//# sourceMappingURL=MovieController.d.ts.map
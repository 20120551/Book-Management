import { AddActorToMovie, CreateMovie, RemoveActorFromMovie, RemoveMovie, UpdateMovie } from "@Application/Commands";
import {
    ICreateMovieHandler,
    IUpdateMovieHandler,
    IRemoveMovieHandler,
    IRemoveActorFromMovieHandler,
    IAddActorToMovieHandler
} from "@Application/Commands/Handler";
import {
    CreateMovieHandler,
    UpdateMovieHandler,
    RemoveMovieHandler,
    RemoveActorFromMovieHandler,
    AddActorToMovieHandler
} from "@Shared/IoC";
import {
    controller,
    httpDelete,
    httpPut,
    httpPost,
    response,
    request,
    next
} from "@Shared/Lib/inversify-express-utils";
import express from "express";

// @Injectable
@controller("/api/movie")
export default class MovieController {
    private readonly _createMovieHandler: ICreateMovieHandler;
    private readonly _updateMovieHandler: IUpdateMovieHandler;
    private readonly _removeMovieHandler: IRemoveMovieHandler;
    private readonly _removeActorFromMovieHandler: IRemoveActorFromMovieHandler;
    private readonly _addActorToMovieHandler: IAddActorToMovieHandler;

    constructor(
        @CreateMovieHandler createMovieHandler: ICreateMovieHandler,
        @UpdateMovieHandler updateMovieHandler: IUpdateMovieHandler,
        @RemoveMovieHandler removeMovieHandler: IRemoveMovieHandler,
        @RemoveActorFromMovieHandler removeActorFromMovieHandler: IRemoveActorFromMovieHandler,
        @AddActorToMovieHandler addActorToMovieHandler: IAddActorToMovieHandler
    ) {
        this._createMovieHandler = createMovieHandler;
        this._updateMovieHandler = updateMovieHandler;
        this._removeActorFromMovieHandler = removeActorFromMovieHandler;
        this._removeMovieHandler = removeMovieHandler;
        this._addActorToMovieHandler = addActorToMovieHandler;
    }


    //router
    @httpPost("/")
    public async Create(@request() req: express.Request, @response() res: express.Response) {
        const { Name, Status, Slot, Price, Localization } = req.body;
        const command = new CreateMovie(Name, Status, Slot, Price, Localization);
        const movie = await this._createMovieHandler.HandleAsync(command);
        return res.status(201).json(movie);
    }

    @httpPut("/:id")
    public async Update(@request() req: express.Request, @response() res: express.Response, @next() next: express.NextFunction) {
        try {
            const { Name, Status, Slot, Price, Localization } = req.body;
            const command = new UpdateMovie(req.params.id, Name, Status, Slot, Price, Localization);
            await this._updateMovieHandler.HandleAsync(command);
            return res.status(204).json({ message: "update command success" });
        } catch (err) {
            next(err);
        }
    }

    @httpDelete("/:id")
    public async Delete(@request() req: express.Request, @response() res: express.Response) {
        // set command id
        const command = new RemoveMovie(req.params.id);
        await this._removeMovieHandler.HandleAsync(command);
        return res.status(204).json({ message: "remove command success" });
    }

    @httpPut("/:id/actor")
    public async AddActor(@request() req: express.Request, @response() res: express.Response) {

        const { Name, Role } = req.body;
        const command = new AddActorToMovie(req.params.id, Name, Role);
        const movie = await this._addActorToMovieHandler.HandleAsync(command);
        return res.status(200).json(movie);
    }

    @httpDelete("/:id/actor/:actorId")
    public async RemoveActor(@request() req: express.Request, @response() res: express.Response) {
        const { id, actorId } = req.params;
        const command = new RemoveActorFromMovie(id, actorId);
        const movie = await this._removeActorFromMovieHandler.HandleAsync(command);
        return res.status(200).json(movie);
    }
}
import { AddActorToMovie, CreateMovie, RemoveActorFromMovie, RemoveMovie, UpdateMovie } from "@Application/Commands";
import {
    ICreateMovieHandler,
    IUpdateMovieHandler,
    IRemoveMovieHandler,
    IRemoveActorFromMovieHandler,
    IAddActorToMovieHandler
} from "@Application/Commands/Handler";
import { ICommandDispatcher } from "@Shared/Dispatcher/Commands";
import {
    CreateMovieHandler,
    UpdateMovieHandler,
    RemoveMovieHandler,
    RemoveActorFromMovieHandler,
    AddActorToMovieHandler,
    CommandDispatcher
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
    private readonly _commandDispatcher: ICommandDispatcher;
    constructor(
        @CommandDispatcher commandDispatcher: ICommandDispatcher
    ) {
        this._commandDispatcher = commandDispatcher;
    }


    //router
    @httpPost("/")
    public async Create(@request() req: express.Request, @response() res: express.Response) {
        const { Name, Status, Slot, Price, Localization } = req.body;
        const command = new CreateMovie(Name, Status, Slot, Price, Localization);
        const movie = await this._commandDispatcher.DispatchAsync(command);
        return res.status(201).json(movie);
    }

    @httpPut("/:id")
    public async Update(@request() req: express.Request, @response() res: express.Response) {
        const { Name, Status, Slot, Price, Localization } = req.body;
        const command = new UpdateMovie(req.params.id, Name, Status, Slot, Price, Localization);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(204).json({ message: "update command success" });
    }

    @httpDelete("/:id")
    public async Delete(@request() req: express.Request, @response() res: express.Response) {
        // set command id
        const command = new RemoveMovie(req.params.id);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(204).json({ message: "remove command success" });
    }

    @httpPut("/:id/actor")
    public async AddActor(@request() req: express.Request, @response() res: express.Response) {

        const { Name, Role } = req.body;
        const command = new AddActorToMovie(req.params.id, Name, Role);
        const movie = await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json(movie);
    }

    @httpDelete("/:id/actor/:actorId")
    public async RemoveActor(@request() req: express.Request, @response() res: express.Response) {
        const { id, actorId } = req.params;
        const command = new RemoveActorFromMovie(id, actorId);
        const movie = await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json(movie);
    }
}
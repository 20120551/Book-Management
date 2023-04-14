import { AddActorToMovie, CreateMovie, RemoveActorFromMovie, RemoveMovie, UpdateMovie } from "@Application/Commands";
import { ICommandDispatcher } from "@Shared/Dispatcher/Commands";
import {
    CommandDispatcher
} from "@Shared/IoC";
import {
    controller,
    httpDelete,
    httpPut,
    httpPost,
    response,
    request,
    interfaces
} from "@Shared/Lib/inversify-express-utils";
import express from "express";
import { MovieStatusMiddleware } from "@Write/Api/Middleware";
import MiddlewareFactory from "../Middleware/MiddlewareFactory";

//resolve middleware
const movieStatusMiddleware = MiddlewareFactory.Create<MovieStatusMiddleware>(MovieStatusMiddleware);
// @Injectable
@controller("/api/movie")
export default class MovieController implements interfaces.Controller {
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
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(201).json({
            message: 'create movie successfully',
            redirect_link: `http://localhost:5001/api/movie/${command.Id}`
        });
    }

    @httpPut(
        "/:movieId",
        movieStatusMiddleware.CheckValidMovieActionBasedOnStatus([
            { status: "Trailer" },
            { status: "Comming soon" }
        ])
    )
    public async Update(@request() req: express.Request, @response() res: express.Response) {
        const { Name, Status, Slot, Price, Localization } = req.body;
        const command = new UpdateMovie(req.params.movieId, Name, Status, Slot, Price, Localization);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(204).json();
    }

    @httpDelete("/:movieId")
    public async Delete(@request() req: express.Request, @response() res: express.Response) {
        // set command id
        const command = new RemoveMovie(req.params.movieId);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(204).json();
    }

    @httpPut("/:movieId/actor")
    public async AddActor(@request() req: express.Request, @response() res: express.Response) {

        const { Name, Role } = req.body;
        const command = new AddActorToMovie(req.params.movieId, Name, Role);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json({
            message: 'add success',
            redirect_link: `http://localhost:5001/api/movie/${command.Id}`
        });
    }

    @httpDelete("/:movieId/actor/:actorId")
    public async RemoveActor(@request() req: express.Request, @response() res: express.Response) {
        const { movieId, actorId } = req.params;
        const command = new RemoveActorFromMovie(movieId, actorId);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json({
            message: "remove success",
            redirect_link: `http://localhost:5001/api/movie/${command.Id}`
        });
    }
}
import { AddActorToMovie, CreateMovie, GetMovie, GetMovies, RemoveActorFromMovie, RemoveMovie, SearchMovie, UpdateMovie } from "@movie/application";
import { } from "@movie/domain";
import { CommandDispatcherModule, ICommandDispatcher, IQueryDispatcher, QueryDispatcherModule } from "@movie/shared";
import { } from "@movie/infrastructure";
import express from "express";
import MiddlewareFactory from "Middleware/MiddlewareFactory";
import { MovieStatusMiddleware } from "Middleware";
import { controller, httpGet, interfaces, response, request, httpPost, httpPut, httpDelete } from "inversify-express-utils";

//resolve middleware
const movieStatusMiddleware = MiddlewareFactory.Create<MovieStatusMiddleware>(MovieStatusMiddleware);
// @Injectable
@controller("/api/movie")
export default class MovieController implements interfaces.Controller {
    private readonly _commandDispatcher: ICommandDispatcher;
    private readonly _queryDispatcher: IQueryDispatcher;
    constructor(
        @CommandDispatcherModule commandDispatcher: ICommandDispatcher,
        @QueryDispatcherModule queryDispatcher: IQueryDispatcher
    ) {
        this._queryDispatcher = queryDispatcher;
        this._commandDispatcher = commandDispatcher;
    }

    @httpGet("/")
    public async GetPerPage(@request() req: express.Request, @response() res: express.Response) {
        const { page, take } = req.query;
        const query = new GetMovies(parseInt(page as string), parseInt(take as string));

        const movies = await this._queryDispatcher.ExecuteAsync(query);
        return res.status(200).json(movies);
    }

    @httpGet("/search")
    public async Search(@request() req: express.Request, @response() res: express.Response) {
        const searchPhase = req.query.q as string;
        const query = new SearchMovie(searchPhase);
        const movies = await this._queryDispatcher.ExecuteAsync(query);
        return res.status(200).json(movies);
    }

    @httpGet("/:id")
    public async Get(@request() req: express.Request, @response() res: express.Response) {
        const query = new GetMovie(req.params.id);
        const movie = await this._queryDispatcher.ExecuteAsync(query);
        return res.status(200).json(movie);
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
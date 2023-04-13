import { GetMovie, GetMovies, SearchMovie } from "@Application/Queries";
import { IQueryDispatcher } from "@Shared/Dispatcher/Queries";
import { QueryDispatcher } from "@Shared/IoC";
import { controller, httpGet, response, request, interfaces } from "@Shared/Lib/inversify-express-utils";
import express from "express";

@controller("/api/movie")
export default class MovieController implements interfaces.Controller {
    private readonly _queryDispatcher: IQueryDispatcher;

    constructor(
        @QueryDispatcher queryDispatcher: IQueryDispatcher
    ) {
        this._queryDispatcher = queryDispatcher;
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
}
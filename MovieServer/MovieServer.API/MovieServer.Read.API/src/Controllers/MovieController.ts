import { GetMovie, GetMovies, SearchMovie } from "@Application/Queries";
import { IGetMovieHandler, IGetMoviesHandler, ISearchMovieHandler } from "@Infrastructure/Read/Queries/Handler";
import { GetMovieHandler, GetMoviesHandler, SearchMovieHandler } from "@Shared/IoC";
import { controller, httpGet, response, request, interfaces } from "@Shared/Lib/inversify-express-utils";
import express from "express";

@controller("/api/movie")
export default class MovieController implements interfaces.Controller {
    private readonly _getMovieHandler: IGetMovieHandler;
    private readonly _getMoviesHandler: IGetMoviesHandler;
    private readonly _searchMovieHandler: ISearchMovieHandler;

    constructor(
        @GetMovieHandler getMovieHandler: IGetMovieHandler,
        @GetMoviesHandler getMoviesHandler: IGetMoviesHandler,
        @SearchMovieHandler searchMovieHandler: ISearchMovieHandler
    ) {
        this._getMovieHandler = getMovieHandler;
        this._getMoviesHandler = getMoviesHandler;
        this._searchMovieHandler = searchMovieHandler;
    }

    @httpGet("/")
    public async GetPerPage(@request() req: express.Request, @response() res: express.Response) {
        const { page, take } = req.query;
        //default page = 0 take = 10

        const query = new GetMovies(parseInt(page as string), parseInt(take as string));
        const movies = await this._getMoviesHandler.HandleAsync(query);
        return res.status(200).json(movies);
    }

    @httpGet("/search")
    public async Search(@request() req: express.Request, @response() res: express.Response) {
        const searchPhase = req.query.q as string;
        const query = new SearchMovie(searchPhase);
        const movies = await this._searchMovieHandler.HandleAsync(query);
        return res.status(200).json(movies);
    }

    @httpGet("/:id")
    public async Get(@request() req: express.Request, @response() res: express.Response) {
        const query = new GetMovie(req.params.id);
        const movie = await this._getMovieHandler.HandleAsync(query);
        return res.status(200).json(movie);
    }
}
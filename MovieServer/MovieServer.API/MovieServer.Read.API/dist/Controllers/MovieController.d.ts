import { IGetMovieHandler, IGetMoviesHandler, ISearchMovieHandler } from "@Infrastructure/Read/Queries/Handler";
import { interfaces } from "@Shared/Lib/inversify-express-utils";
import express from "express";
export default class MovieController implements interfaces.Controller {
    private readonly _getMovieHandler;
    private readonly _getMoviesHandler;
    private readonly _searchMovieHandler;
    constructor(getMovieHandler: IGetMovieHandler, getMoviesHandler: IGetMoviesHandler, searchMovieHandler: ISearchMovieHandler);
    GetPerPage(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    Search(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    Get(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}
//# sourceMappingURL=MovieController.d.ts.map
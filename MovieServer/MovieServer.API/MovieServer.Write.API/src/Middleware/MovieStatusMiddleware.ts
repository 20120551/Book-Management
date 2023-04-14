import { IRequestMiddleware } from "@Shared/Middleware";
import express from "express";
import { MovieId } from "@Domain/ValueObjects";
import { TYPES } from "@Shared/IoC";
import { Container } from "@Shared/Lib/inversify";
import { IMovieRepo } from "@Domain/Repositories";

export default class MovieStatusMiddleware implements IRequestMiddleware {
    private readonly _container: Container;
    constructor(
        container: Container
    ) {
        this._container = container;
    }

    public CheckValidMovieActionBasedOnStatus(args: { status: string }[]) {

        return async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction) => {

            const movieRepo = this._container.get<IMovieRepo>(TYPES.MovieRepo);
            const { movieId } = req.params;

            // get movie
            const movie = await movieRepo.Get(MovieId.Create(movieId));
            if (movie === null) {
                return res.status(400).json({ message: "Not found movie" });
            }

            const accepted = args.find(arg => arg.status === movie.Status.Status);
            if (!accepted) {
                return res.status(403).json({ message: `can't not execute that operation` });
            }
            return next();
        }
    }
}
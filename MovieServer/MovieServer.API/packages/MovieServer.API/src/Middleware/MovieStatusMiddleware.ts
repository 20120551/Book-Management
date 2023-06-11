import { } from "@movie/application";
import { IMovieRepo, MovieId } from "@movie/domain";
import { IRequestMiddleware, TYPES } from "@movie/shared";
import { } from "@movie/infrastructure";
import { Container } from "inversify";
import express from "express";

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
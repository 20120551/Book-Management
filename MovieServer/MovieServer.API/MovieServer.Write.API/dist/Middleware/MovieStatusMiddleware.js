"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObjects_1 = require("@Domain/ValueObjects");
const IoC_1 = require("@Shared/IoC");
class MovieStatusMiddleware {
    constructor(container) {
        this._container = container;
    }
    CheckValidMovieActionBasedOnStatus(args) {
        return async (req, res, next) => {
            const movieRepo = this._container.get(IoC_1.TYPES.MovieRepo);
            const { movieId } = req.params;
            // get movie
            const movie = await movieRepo.Get(ValueObjects_1.MovieId.Create(movieId));
            if (movie === null) {
                return res.status(400).json("Not found movie");
            }
            const accepted = args.find(arg => arg.status === movie.Status.Status);
            if (!accepted) {
                return res.status(403).json(`can't not execute that operation`);
            }
            return next();
        };
    }
}
exports.default = MovieStatusMiddleware;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("@movie/domain");
const shared_1 = require("@movie/shared");
class MovieStatusMiddleware {
    constructor(container) {
        this._container = container;
    }
    CheckValidMovieActionBasedOnStatus(args) {
        return async (req, res, next) => {
            const movieRepo = this._container.get(shared_1.TYPES.MovieRepo);
            const { movieId } = req.params;
            // get movie
            const movie = await movieRepo.Get(domain_1.MovieId.Create(movieId));
            if (movie === null) {
                return res.status(400).json({ message: "Not found movie" });
            }
            const accepted = args.find(arg => arg.status === movie.Status.Status);
            if (!accepted) {
                return res.status(403).json({ message: `can't not execute that operation` });
            }
            return next();
        };
    }
}
exports.default = MovieStatusMiddleware;

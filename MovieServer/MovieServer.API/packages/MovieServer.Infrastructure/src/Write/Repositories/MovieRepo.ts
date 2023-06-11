import { IMovieRepo, Movie, MovieId } from "@movie/domain";
import { Injectable, WriteDbClient } from "@movie/shared";
import { Model, ModelStatic } from "sequelize";
import { DbClientWriteSide } from "./DbClient";
import { MovieModel } from "../Models";

@Injectable
export default class MovieRepo implements IMovieRepo {
    private _movieModel: ModelStatic<Model<any, any>>;

    constructor(
        @WriteDbClient dbClient: DbClientWriteSide,
    ) {
        this._movieModel = dbClient.models.MovieModel;
    }

    async Get(id: MovieId): Promise<Movie | null> {
        var movie = await this._movieModel.findOne({
            where: { Id: id.Guid },
            include: [MovieModel.associations.Actors]
        });

        if (!movie) {
            return null;
        }

        return movie.get();
    }
    async Update(movie: Movie): Promise<void> {
        const { Id, Name, Slot, Price, Localization, Status, Actors } = movie;
        // update actor
        console.log(Actors);
        await this._movieModel.update({
            Name: Name,
            Slot: Slot,
            Price: Price,
            Localization: Localization,
            Status: Status,
            Actors: Actors
        }, {
            where: {
                Id: Id.Guid
            }
        })
    }
    async Create(movie: Movie): Promise<Movie> {
        const _movie = await this._movieModel.create({ ...movie });
        return _movie.get();
    }
    async Remove(movie: Movie): Promise<void> {
        await this._movieModel.destroy({
            where: {
                Id: movie.Id.Guid
            }
        })
    }

}
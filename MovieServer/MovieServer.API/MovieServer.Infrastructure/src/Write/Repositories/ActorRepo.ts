import { Movie } from "@Domain/Entities";
import { IActorRepo } from "@Domain/Repositories";
import { Actor } from "@Domain/ValueObjects";
import { Injectable, WriteDbClient } from "@Shared/IoC";
import { Model, ModelStatic } from "sequelize";
import { DbClient } from "./DbClient";

@Injectable
export default class ActorRepo implements IActorRepo {

    private _actorModel: ModelStatic<Model<any, any>>;
    constructor(
        @WriteDbClient dbClient: DbClient,
    ) {
        this._actorModel = dbClient.models.ActorModel;
    }
    async Get(id: number): Promise<Actor | null> {
        const actor = await this._actorModel.findByPk(id);
        if (!actor) {
            return null;
        }
        return actor.dataValues;
    }
    async Create(actor: Actor, movie: Movie): Promise<any> {
        const _actor = await this._actorModel.create({ ...actor, MovieId: movie.Id.Guid });
        return _actor.dataValues;
    }
    async Delete(id: number): Promise<void> {
        await this._actorModel.destroy({
            where: {
                Id: id
            }
        })
    }

}
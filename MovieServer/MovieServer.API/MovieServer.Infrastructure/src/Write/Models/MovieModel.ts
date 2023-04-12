import {
    MovieId, MovieName, MoviePrice,
    MovieSlot, Localization, MovieStatus
} from "@Domain/ValueObjects";

import { Association, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { ActorModel } from ".";

export default class MovieModel
    extends Model<InferAttributes<MovieModel>, InferCreationAttributes<MovieModel>>
{
    declare Id: string;
    declare Name: string;
    declare Status: string;
    declare Price: number;
    declare Slot: number;
    declare Localization: string;
    declare Actors?: NonAttribute<ActorModel[]>;

    declare static associations: {
        Actors: Association<MovieModel, ActorModel>;
    };
}
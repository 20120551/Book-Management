import { ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { MovieModel } from ".";

export default class ActorModel extends Model<InferAttributes<ActorModel>, InferCreationAttributes<ActorModel>>
{
    declare Id: number;
    declare Name: string;
    declare Role: string;

    declare MovieId: ForeignKey<MovieModel["Id"]>;
    declare Movie?: NonAttribute<MovieModel>;
}
import { ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { MovieModel } from ".";
export default class ActorModel extends Model<InferAttributes<ActorModel>, InferCreationAttributes<ActorModel>> {
    Id: number;
    Name: string;
    Role: string;
    MovieId: ForeignKey<MovieModel["Id"]>;
    Movie?: NonAttribute<MovieModel>;
}

import { Association, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { ActorModel } from ".";
export default class MovieModel extends Model<InferAttributes<MovieModel>, InferCreationAttributes<MovieModel>> {
    Id: string;
    Name: string;
    Status: string;
    Price: number;
    Slot: number;
    Localization: string;
    Actors?: NonAttribute<ActorModel[]>;
    static associations: {
        Actors: Association<MovieModel, ActorModel>;
    };
}
//# sourceMappingURL=MovieModel.d.ts.map
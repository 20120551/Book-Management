import mongoose, { Model, SchemaDefinition } from "mongoose";
import { DbClient as DbClient } from "./DbClient";
export default class GenericRepo<TModel extends mongoose.Document> {
    protected _model: Model<TModel>;
    private _name;
    constructor(dbClient: DbClient, name: string, schemaDefination: SchemaDefinition);
}
//# sourceMappingURL=GenericRepo.d.ts.map
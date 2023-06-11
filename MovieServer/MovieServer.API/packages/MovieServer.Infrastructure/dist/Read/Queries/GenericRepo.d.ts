import mongoose, { Model, SchemaDefinition } from "mongoose";
import { DbClientReadSide } from "./DbClient";
export default class GenericRepo<TModel extends mongoose.Document> {
    protected _model: Model<TModel>;
    private _name;
    constructor(dbClient: DbClientReadSide, name: string, schemaDefination: SchemaDefinition);
}

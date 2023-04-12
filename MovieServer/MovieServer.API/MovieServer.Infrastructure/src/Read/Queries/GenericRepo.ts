import mongoose, { Model, Schema, SchemaDefinition } from "mongoose";
import { DbClient as DbClient } from "./DbClient";

export default class GenericRepo<TModel extends mongoose.Document>
{
    protected _model: Model<TModel>;
    private _name: string;
    constructor(
        dbClient: DbClient,
        name: string,
        schemaDefination: SchemaDefinition
    ) {
        this._name = name;
        const schema = new Schema(schemaDefination, { collection: this._name });
        this._model = dbClient.model<TModel>(this._name, schema);
    }

}
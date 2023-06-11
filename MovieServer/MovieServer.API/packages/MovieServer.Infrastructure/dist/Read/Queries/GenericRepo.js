"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class GenericRepo {
    constructor(dbClient, name, schemaDefination) {
        this._name = name;
        const schema = new mongoose_1.Schema(schemaDefination, { collection: this._name });
        this._model = dbClient.model(this._name, schema);
    }
}
exports.default = GenericRepo;

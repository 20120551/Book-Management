"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRepository = void 0;
const mongodb_1 = require("mongodb");
const ioc_1 = require("../ioc");
const class_transformer_1 = require("class-transformer");
let GenericRepository = exports.GenericRepository = class GenericRepository {
    _collection;
    _constructor;
    constructor(constructor, db, name) {
        this._collection = db.collection(name);
        this._constructor = constructor;
    }
    async findById(filter) {
        const entity = await this._collection.findOne(filter);
        return (0, class_transformer_1.plainToInstance)(this._constructor, entity);
    }
    async find(filter, query) {
        const entities = await this._collection
            .find(filter)
            .limit(query.take)
            .skip(query.skip).toArray();
        const result = entities.map(data => {
            return (0, class_transformer_1.plainToInstance)(this._constructor, data);
        });
        return result;
    }
    async create(entity) {
        await this._collection.insertOne(entity);
    }
    async update(filter, entity) {
        await this._collection.updateOne(filter, entity);
    }
    async delete(filter) {
        await this._collection.deleteOne(filter);
    }
};
exports.GenericRepository = GenericRepository = __decorate([
    ioc_1.Injectable,
    __param(0, ioc_1.Unmanaged),
    __param(1, ioc_1.Unmanaged),
    __param(2, ioc_1.Unmanaged),
    __metadata("design:paramtypes", [Object, mongodb_1.Db, String])
], GenericRepository);

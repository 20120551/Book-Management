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
exports.CacheService = void 0;
const ioc_1 = require("../ioc");
let CacheService = exports.CacheService = class CacheService {
    _client;
    constructor(_client) {
        this._client = _client;
    }
    async set(key, data, ttl) {
        const serializeData = JSON.stringify(data);
        await this._client.set(key, serializeData, { EX: ttl });
    }
    async get(key) {
        const data = await this._client.get(key);
        if (!data) {
            return null;
        }
        const deserializeData = JSON.parse(data);
        return deserializeData;
    }
    async remove(key) {
        const isExist = await this._client.exists(key);
        if (!isExist) {
            return false;
        }
        await this._client.del(key);
        return true;
    }
};
exports.CacheService = CacheService = __decorate([
    __param(0, ioc_1.RedisClient),
    __metadata("design:paramtypes", [Object])
], CacheService);

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
const DTO_1 = require("@Application/DTO");
const IoC_1 = require("@Shared/IoC");
const ValueObjects_1 = require("@Domain/ValueObjects");
const Exceptions_1 = require("@Application/Exceptions");
const Entities_1 = require("@Domain/Entities");
let GetCartHandler = class GetCartHandler {
    constructor(cartRepo, mapper) {
        this._mapper = mapper;
        this._cartRepo = cartRepo;
    }
    async HandleAsync(query) {
        const cart = await this._cartRepo.Get(ValueObjects_1.CartId.Create(query.Id));
        if (cart === null) {
            throw new Exceptions_1.NotFoundCartException();
        }
        const cartResponse = this._mapper.map(cart, Entities_1.Cart, DTO_1.CartReadDto);
        return cartResponse;
    }
};
GetCartHandler = __decorate([
    IoC_1.Injectable,
    __param(0, IoC_1.CartRepo),
    __param(1, IoC_1.Mapper),
    __metadata("design:paramtypes", [Object, Object])
], GetCartHandler);
exports.default = GetCartHandler;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entities_1 = require("../Entities");
const ValueObjects_1 = require("../ValueObjects");
const shared_1 = require("@movie/shared");
let CartFactory = class CartFactory {
    CreateMovieItem({ Id, Name, Quantity, Price, Seat }) {
        return new ValueObjects_1.MovieItem(Id, Name, Price, Quantity, Seat);
    }
    Create({ Id, MovieItem }) {
        const cart = new Entities_1.Cart(Id);
        if (MovieItem !== undefined) {
            cart.Adds(MovieItem);
        }
        return cart;
    }
};
CartFactory = __decorate([
    shared_1.Injectable
], CartFactory);
exports.default = CartFactory;

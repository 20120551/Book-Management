"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CartReadDto {
    /**
     *
     */
    constructor(Id, Receiver, MovieItems) {
        this.Id = Id;
        this.Receiver = Receiver;
        this.MovieItems = MovieItems;
    }
}
exports.default = CartReadDto;

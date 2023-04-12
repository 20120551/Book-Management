"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
exports.MovieModel = {
    Id: String,
    //name
    Name: String,
    //status
    Status: String,
    //price
    Slot: String,
    //price
    Price: String,
    //localization
    Localization: {
        District: String,
        City: String
    },
    Actors: [{
            Name: String,
            Role: String,
            Id: Number
        }]
};

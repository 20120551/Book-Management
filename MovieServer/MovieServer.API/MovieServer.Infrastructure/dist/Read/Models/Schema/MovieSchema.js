"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSchema = void 0;
const Models_1 = require("@Infrastructure/Read/Models");
const mongoose_1 = require("mongoose");
exports.MovieSchema = new mongoose_1.Schema(Models_1.MovieModel, { collection: "Movie" });

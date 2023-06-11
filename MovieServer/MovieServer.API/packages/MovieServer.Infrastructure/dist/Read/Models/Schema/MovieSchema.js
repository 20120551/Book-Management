"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSchema = void 0;
const MovieModel_1 = require("../MovieModel");
const mongoose_1 = require("mongoose");
exports.MovieSchema = new mongoose_1.Schema(MovieModel_1.MovieModel, { collection: "Movie" });

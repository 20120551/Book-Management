import { MovieModel } from "../MovieModel";
import { Schema } from "mongoose";

export const MovieSchema = new Schema(MovieModel, { collection: "Movie" });
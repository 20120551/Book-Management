import { MovieModel } from "@Infrastructure/Read/Models";
import { Schema } from "mongoose";

export const MovieSchema = new Schema(MovieModel, { collection: "Movie" });
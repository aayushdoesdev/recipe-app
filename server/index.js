import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { userRouter } from "./routes/users.route.js";
import { recipeRouter } from "./routes/recipes.route.js";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use("/auth", userRouter)
app.use("/recipes", recipeRouter)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err));


app.listen(process.env.PORT, () => {
    console.log("Server started!")
})
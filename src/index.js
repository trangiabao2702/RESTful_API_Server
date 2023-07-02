import path from "path";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import "dotenv/config";

import router from "./routes/index.js";
import { mongoURI, mongoOptions } from "./config/mongoConfig.js";

const port = process.env.PORT || 5000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

router(app);

mongoose
  .connect(mongoURI, mongoOptions)
  .then(() => {
    console.log("Connected to MongoDB...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });

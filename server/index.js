import express from "express";
import cors from "cors";
import session from "express-session";
import "dotenv/config.js";
import mongoose from "mongoose";
import AppController from "./src/app-controller.js";
import { createFacilities } from "./src/facilities-dao.js";
import rateLimit from "express-rate-limit";

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/bdsumhac-db";
console.log("connecting to " + CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(express.json());
console.log("allowing access for " + process.env.FRONTEND_URL);
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

// controllers go here
AppController(app);

app.listen(process.env.PORT || 4000);

// init data if missing existing data
createFacilities();

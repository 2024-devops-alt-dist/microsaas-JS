import express from "express";
import cors from "cors";
import fs from "fs";
import { env } from "process";
import { uploadsDirectory } from "./config/uploads";

const FRONTEND_PORT = env.FRONTEND_PORT || 5173;
const FRONTEND_URL = env.FRONTEND_URL;
const CORS_ORIGINS = env.CORS_ORIGINS;

const configuredOrigins = CORS_ORIGINS
  ? CORS_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  : [];

const allowedOrigins = [
  ...configuredOrigins,
  FRONTEND_URL,
  `http://localhost:${FRONTEND_PORT}`,
  "http://localhost:5173",
  "https://surprise-dusky-zeta.vercel.app",
].filter((origin): origin is string => Boolean(origin));

const app = express();

fs.mkdirSync(uploadsDirectory, { recursive: true });

// incoming JSON bodies need to be parsed or `req.body` will be undefined
app.use(express.json());
app.use("/uploads", express.static(uploadsDirectory));

// CORS configuration: allow the dev frontend port and the deployed domain
const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const version = "v1";
const apiPath = `/api/${version}`;

import { router as usersRoute } from "./routes/users";
app.use(`${apiPath}/users`, usersRoute);

import { router as authRoute } from "./routes/auth";
app.use(`${apiPath}/auth`, authRoute);

import { router as festiveEventRoute } from "./routes/festiveEvent";
app.use(`${apiPath}/festiveEvent`, festiveEventRoute);

import { router as giftsRoute } from "./routes/gifts";
app.use(`${apiPath}/gifts`, giftsRoute);

export default app;

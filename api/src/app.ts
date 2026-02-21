import express from "express";
import cors from "cors";
import { env } from "process";

const FRONTEND_PORT = env.FRONTEND_PORT || 5173;

const app = express();

const corsOptions = {
  origin: [
    `http://localhost:${FRONTEND_PORT}`,
    "https://surprise-dusky-zeta.vercel.app/",
  ], // l'URL front
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const version = "v1";
const path = `/api/${version}`;

import { router as usersRoute } from "./routes/users";
app.use(`${path}/users`, usersRoute);

import { router as festiveEventRoute } from "./routes/festiveEvent";
app.use(`${path}/festiveEvent`, festiveEventRoute);

import { router as giftsRoute } from "./routes/gifts";
app.use(`${path}/gifts`, giftsRoute);

import { router as commentsRoute } from "./routes/comments";
app.use(`${path}/comments`, commentsRoute);

export default app;

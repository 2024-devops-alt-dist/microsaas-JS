import express from "express";
import cors from "cors";
import { env } from "process";

const FRONTEND_PORT = env.FRONTEND_PORT || 5173;

const app = express();

// incoming JSON bodies need to be parsed or `req.body` will be undefined
app.use(express.json());

// CORS configuration: allow the dev frontend port and the deployed domain
const corsOptions = {
  origin: [
    `http://localhost:${FRONTEND_PORT}`,
    "https://surprise-dusky-zeta.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const version = "v1";
const path = `/api/${version}`;

import { router as usersRoute } from "./routes/users";
app.use(`${path}/users`, usersRoute);

import { router as authRoute } from "./routes/auth";
app.use(`${path}/auth`, authRoute);

import { router as festiveEventRoute } from "./routes/festiveEvent";
app.use(`${path}/festiveEvent`, festiveEventRoute);

export default app;

import express from "express";
import cors from "cors";
import { env } from "process";

const FRONTEND_PORT = env.FRONTEND_PORT || 5173;

const app = express();

const corsOptions = {
  origin: `http://localhost:${FRONTEND_PORT}`, // l'URL front
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const version = "v1";
const path = `/api/${version}`;

import { router as healthRoute } from "./routes/health";
app.use(`${path}/health`, healthRoute);

export default app;

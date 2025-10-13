import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // l'URL front
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const version = "v1";
const path = `/api/${version}`;

import { router as healthRoute } from "./routes/health";
app.use(`${path}/health`, healthRoute);

export default app;

import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Remplace par l'URL de ton front
  methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
};
app.use(cors(corsOptions));

const version = "v1";
const path = `/api/${version}`;

import { router as healthRoute } from "./routes/health";
app.use(`${path}/health`, healthRoute);

export default app;

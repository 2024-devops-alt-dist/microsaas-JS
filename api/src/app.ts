import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5432;

const corsOptions = {
  origin: "http://localhost:5173", // Remplace par l'URL de ton front
  methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
};
app.use(cors(corsOptions));

const version = "v1";
const path = `/api/${version}`;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });

import { router as itemsRoute } from "./routes/items";
app.use(`${path}/items`, itemsRoute);

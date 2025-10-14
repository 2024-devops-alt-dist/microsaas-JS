import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { pool } from "./db/config";
import { env } from "process";

const API_PORT = env.API_PORT || 3000;

pool
  .connect()
  .then(() => {
    console.log("Connexion à PostgreSQL réussie");

    app.listen(API_PORT, () => {
      console.log(`Server is running on http://localhost:${API_PORT}`);
    });
  })
  .catch((err: Error) =>
    console.error("Erreur de connexion à PostgreSQL", err),
  );

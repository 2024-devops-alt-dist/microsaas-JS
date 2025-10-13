import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { pool } from "./db/config";
import { env } from "process";

const PORT = env.PORT || 3000;

pool
  .connect()
  .then(() => {
    console.log("Connexion à PostgreSQL réussie");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) =>
    console.error("Erreur de connexion à PostgreSQL", err),
  );

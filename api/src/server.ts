import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { pool } from "./db/config";

pool
  .connect()
  .then(() => {
    console.log("Connexion à PostgreSQL réussie");

    const PORT = 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) =>
    console.error("Erreur de connexion à PostgreSQL", err),
  );

import dotenv from "dotenv";
dotenv.config();
import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from "./db/config";
import app from "./app";
import { env } from "process";
import { mainFixtures } from "./db/fixtures";

const API_PORT = env.API_PORT || 3000;

const db = drizzle({ client: pool });

pool
  .connect()
  .then(async () => {
    console.log("Connexion à PostgreSQL réussie");

    app.listen(API_PORT, () => {
      console.log(`Server is running on http://localhost:${API_PORT}`);
    });

    await mainFixtures(db);
  })
  .catch((err: Error) =>
    console.error("Erreur de connexion à PostgreSQL", err),
  );

export { db };

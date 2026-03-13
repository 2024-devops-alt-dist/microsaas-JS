import dotenv from "dotenv";
dotenv.config();
import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from "./db/config";
import app from "./app";
import { env } from "process";
import { mainFixtures } from "./db/fixtures";
import { exec as execCb } from "child_process";
import { promisify } from "util";

const API_PORT = Number(env.PORT || env.API_PORT || 3000);
const exec = promisify(execCb);
const shouldRunFixtures =
  env.RUN_FIXTURES === "true" ||
  (env.RUN_FIXTURES !== "false" && env.NODE_ENV !== "production");

const db = drizzle({ client: pool });

async function ensureMigrationsApplied() {
  try {
    console.log("Running database migrations (drizzle-kit)...");
    await exec("npx drizzle-kit migrate --config ./drizzle.config.ts");
    console.log("Migrations applied");
  } catch (err) {
    console.error("Failed to apply migrations", err);
    throw err;
  }
}

pool
  .connect()
  .then(async () => {
    console.log("Connexion à PostgreSQL réussie");

    await ensureMigrationsApplied();

    app.listen(API_PORT, () => {
      console.log(`Server is running on http://localhost:${API_PORT}`);
    });

    if (shouldRunFixtures) {
      await mainFixtures(db);
    } else {
      console.log(
        "Skipping fixtures: RUN_FIXTURES disabled for this environment",
      );
    }
  })
  .catch((err: Error) =>
    console.error("Erreur de connexion à PostgreSQL", err),
  );

export { db };

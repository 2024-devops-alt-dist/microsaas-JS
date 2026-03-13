import { Pool } from "pg";

const useDatabaseUrl = Boolean(process.env.DATABASE_URL);
const dbPort = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT, 10)
  : undefined;

export const pool = new Pool(
  useDatabaseUrl
    ? {
        connectionString: process.env.DATABASE_URL,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: dbPort,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      },
);

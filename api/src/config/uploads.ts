import path from "path";
import { env } from "process";

export const uploadsDirectory = path.resolve(
  process.cwd(),
  env.UPLOADS_DIR || "uploads",
);

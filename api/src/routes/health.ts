import { Router } from "express";
export const router = Router();

import { healthController } from "~/controllers/health";

router.get("/", healthController.getAll);

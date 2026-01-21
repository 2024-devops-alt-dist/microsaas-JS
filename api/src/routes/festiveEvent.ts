import { Router } from "express";
export const router = Router();

import { festiveEventController } from "~/controllers/festiveEvent";

router.get("/", festiveEventController.getAll);

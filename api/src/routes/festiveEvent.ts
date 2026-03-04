import { Router } from "express";
export const router = Router();

import { festiveEventController } from "~/controllers/festiveEvent";

router.get("/", festiveEventController.getAll);
router.get("/:id", festiveEventController.getById);
router.post("/", festiveEventController.create);
router.put("/:id", festiveEventController.update);
router.delete("/:id", festiveEventController.delete);

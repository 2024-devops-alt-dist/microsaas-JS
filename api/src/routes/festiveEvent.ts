import { Router } from "express";
export const router = Router();

import { festiveEventController } from "~/controllers/festiveEvent";
import { authenticate } from "~/middleware/auth";

router.get("/mine", authenticate, festiveEventController.getMine);
router.get("/", festiveEventController.getAll);
router.get("/:id/participants", festiveEventController.getParticipants);
router.get("/:id", festiveEventController.getById);
router.post("/", festiveEventController.create);
router.put("/:id", festiveEventController.update);
router.delete("/:id", festiveEventController.delete);

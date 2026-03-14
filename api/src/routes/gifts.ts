import { Router } from "express";
export const router = Router();

import { giftsController } from "~/controllers/gifts";
import { authenticate } from "~/middleware/auth";

router.get("/", giftsController.getAll);
router.get("/:id", giftsController.getById);
router.post("/", giftsController.create);
router.put("/:id/toggle-offered", authenticate, giftsController.toggleOffered);
router.put("/:id", giftsController.update);
router.delete("/:id", giftsController.delete);

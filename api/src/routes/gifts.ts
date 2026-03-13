import { Router } from "express";
export const router = Router();

import { giftsController } from "~/controllers/gifts";

router.get("/", giftsController.getAll);
router.get("/:id", giftsController.getById);
router.post("/", giftsController.create);
router.put("/:id", giftsController.update);
router.delete("/:id", giftsController.delete);

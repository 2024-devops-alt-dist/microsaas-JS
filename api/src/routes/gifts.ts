import { Router } from "express";
export const router = Router();

import { giftsController } from "~/controllers/gifts";
import { authenticate } from "~/middleware/auth";
import { uploadGiftImage } from "~/middleware/uploadGiftImage";

router.get("/", giftsController.getAll);
router.get("/:id", giftsController.getById);
router.post("/", uploadGiftImage, giftsController.create);
router.put("/:id/toggle-offered", authenticate, giftsController.toggleOffered);
router.put(
  "/:id/toggle-multiple-gifters",
  authenticate,
  giftsController.toggleMultipleGifters,
);
router.put("/:id", giftsController.update);
router.delete("/:id", giftsController.delete);

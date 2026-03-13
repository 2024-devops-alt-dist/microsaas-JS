import { Router } from "express";
export const router = Router();

import { commentsController } from "~/controllers/comments";

router.get("/", commentsController.getAll);
router.get("/:id", commentsController.getById);
router.post("/", commentsController.create);
router.put("/:id", commentsController.update);
router.delete("/:id", commentsController.delete);

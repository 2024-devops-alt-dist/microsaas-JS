import { Router } from "express";
export const router = Router();

import { usersController } from "~/controllers/users";

router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);

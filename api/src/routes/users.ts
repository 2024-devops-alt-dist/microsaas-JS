import { Router } from "express";
export const router = Router();

import { usersController } from "~/controllers/users";
import { authenticate } from "~/middleware/auth";

// require authentication for any user-related operations
router.use(authenticate);

router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);

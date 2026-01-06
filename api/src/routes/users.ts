import { Router } from "express";
export const router = Router();

import { usersController } from "~/controllers/users";

router.get("/", usersController.getAll);

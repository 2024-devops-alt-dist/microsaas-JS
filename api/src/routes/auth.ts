import { Router } from "express";
export const router = Router();

import { authController } from "~/controllers/auth";

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);

import { Router } from "express";
export const router = Router();

import { itemsController } from "~/controllers/items";

router.get("/", itemsController.getAll);

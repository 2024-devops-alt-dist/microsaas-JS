import { Request, Response } from "express";
import { giftsService } from "../services/giftsService";
import { AuthenticatedRequest } from "../middleware/auth";
import {
  deleteStoredGiftImage,
  storeGiftImage,
} from "../services/giftImageStorage";

const parseRequiredString = (value: unknown) => {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized;
};

const parseNullableString = (value: unknown) => {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
};

const parseRequiredInteger = (value: unknown) => {
  if (typeof value === "number") {
    return Number.isInteger(value) ? value : Number.NaN;
  }

  return Number.parseInt(String(value), 10);
};

const parseBooleanField = (value: unknown, fallback: boolean) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    if (value === "true") {
      return true;
    }

    if (value === "false") {
      return false;
    }
  }

  return fallback;
};

export const giftsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const data = await giftsService.getAll();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const gift = await giftsService.getById(parseInt(id, 10));
      if (!gift) {
        return res.status(404).json({ message: "Gift not found" });
      }
      res.status(200).json({ data: gift });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const title = parseRequiredString(req.body.title);
      const description = parseNullableString(req.body.description);
      const product_link = parseNullableString(req.body.product_link);
      const id_wishing_user = parseRequiredInteger(req.body.id_wishing_user);
      const is_offered = parseBooleanField(req.body.is_offered, false);
      const multiple_gifters = parseBooleanField(
        req.body.multiple_gifters,
        false,
      );
      const id_author_user = parseRequiredInteger(req.body.id_author_user);
      const requestWithFile = req as Request & { file?: Express.Multer.File };

      if (!title) {
        return res.status(400).json({ message: "title is required" });
      }

      if (
        !Number.isInteger(id_wishing_user) ||
        !Number.isInteger(id_author_user)
      ) {
        return res.status(400).json({
          message: "id_wishing_user and id_author_user must be integers",
        });
      }

      let image_url = parseNullableString(req.body.image_url);
      if (requestWithFile.file) {
        image_url = await storeGiftImage(requestWithFile.file);
      }

      const gift = await giftsService.create(
        title,
        description,
        image_url,
        product_link,
        id_wishing_user,
        is_offered,
        multiple_gifters,
        id_author_user,
      );
      res.status(201).json({ data: gift });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        image_url,
        product_link,
        id_wishing_user,
        is_offered,
        multiple_gifters,
        id_author_user,
      } = req.body;
      const gift = await giftsService.update(
        parseInt(id, 10),
        title,
        description,
        image_url,
        product_link,
        id_wishing_user,
        is_offered ?? false,
        multiple_gifters ?? false,
        id_author_user,
      );
      if (!gift) {
        return res.status(404).json({ message: "Gift not found" });
      }
      res.status(200).json({ data: gift });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  toggleOffered: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { is_offered } = req.body as { is_offered?: unknown };
      const rawUserId = req.user?.id;
      const userId =
        typeof rawUserId === "number"
          ? rawUserId
          : Number.parseInt(String(rawUserId), 10);

      if (!Number.isFinite(userId)) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (typeof is_offered !== "boolean") {
        return res
          .status(400)
          .json({ message: "is_offered must be a boolean" });
      }

      const giftId = parseInt(id, 10);
      const currentGift = await giftsService.getById(giftId);

      if (!currentGift) {
        return res.status(404).json({ message: "Gift not found" });
      }

      const offeringUserIds = await giftsService.getOfferingUserIds(giftId);
      const isCurrentUserOffering = offeringUserIds.includes(userId);

      if (is_offered) {
        if (
          !currentGift.multiple_gifters &&
          offeringUserIds.length > 0 &&
          !isCurrentUserOffering
        ) {
          return res.status(403).json({
            message: "This gift is already offered by another user",
          });
        }

        if (!isCurrentUserOffering) {
          await giftsService.addOfferingUser(giftId, userId);
        }

        const refreshedOfferingUserIds =
          await giftsService.getOfferingUserIds(giftId);
        const gift = await giftsService.updateOfferedStatus(
          giftId,
          refreshedOfferingUserIds.length > 0,
        );

        if (!gift) {
          return res.status(404).json({ message: "Gift not found" });
        }

        return res.status(200).json({
          data: {
            ...gift,
            offering_user_ids: refreshedOfferingUserIds,
          },
        });
      }

      if (!isCurrentUserOffering) {
        return res.status(403).json({
          message: "Only users currently offering this gift can cancel",
        });
      }

      await giftsService.removeOfferingUser(giftId, userId);
      const refreshedOfferingUserIds =
        await giftsService.getOfferingUserIds(giftId);
      const gift = await giftsService.updateOfferedStatus(
        giftId,
        refreshedOfferingUserIds.length > 0,
      );

      if (!gift) {
        return res.status(404).json({ message: "Gift not found" });
      }

      res.status(200).json({
        data: {
          ...gift,
          offering_user_ids: refreshedOfferingUserIds,
        },
      });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  toggleMultipleGifters: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { multiple_gifters } = req.body as { multiple_gifters?: unknown };
      const rawUserId = req.user?.id;
      const userId =
        typeof rawUserId === "number"
          ? rawUserId
          : Number.parseInt(String(rawUserId), 10);

      if (!Number.isFinite(userId)) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (typeof multiple_gifters !== "boolean") {
        return res
          .status(400)
          .json({ message: "multiple_gifters must be a boolean" });
      }

      const giftId = parseInt(id, 10);
      const currentGift = await giftsService.getById(giftId);

      if (!currentGift) {
        return res.status(404).json({ message: "Gift not found" });
      }

      if (currentGift.id_wishing_user === userId) {
        return res.status(403).json({
          message: "Gift owner cannot change multiple gifters",
        });
      }

      const gift = await giftsService.updateMultipleGiftersStatus(
        giftId,
        multiple_gifters,
      );

      if (!gift) {
        return res.status(404).json({ message: "Gift not found" });
      }

      res.status(200).json({ data: gift });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await giftsService.delete(parseInt(id, 10));
      if (!deleted) {
        return res.status(404).json({ message: "Gift not found" });
      }

      if (deleted.image_url) {
        try {
          await deleteStoredGiftImage(deleted.image_url);
        } catch (error) {
          console.error("Failed to delete gift image", error);
        }
      }

      res.status(200).json({ message: "Gift deleted" });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
};

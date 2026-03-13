import { Request, Response } from "express";
import { giftsService } from "../services/giftsService";

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
      const gift = await giftsService.create(
        title,
        description,
        image_url,
        product_link,
        id_wishing_user,
        is_offered ?? false,
        multiple_gifters ?? false,
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

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await giftsService.delete(parseInt(id, 10));
      if (!deleted) {
        return res.status(404).json({ message: "Gift not found" });
      }
      res.status(200).json({ message: "Gift deleted" });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
};

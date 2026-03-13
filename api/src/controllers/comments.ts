import { Request, Response } from "express";
import { commentsService } from "../services/commentsService";

export const commentsController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const comments = await commentsService.getAll();
      res.status(200).json({ data: comments });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const comment = await commentsService.getById(Number(id));
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({ data: comment });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { message, id_user, id_gift, is_public } = req.body;
      const comment = await commentsService.create(
        message,
        id_user,
        id_gift,
        is_public ?? false,
      );
      res.status(201).json({ data: comment });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { message, is_public } = req.body;
      const comment = await commentsService.update(
        Number(id),
        message,
        is_public,
      );
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({ data: comment });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const comment = await commentsService.delete(Number(id));
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
};

import { Request, Response } from "express";
import { festiveEventService } from "../services/festiveEventService";

export const festiveEventController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const data = await festiveEventService.getAllEvents();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await festiveEventService.getEventById(Number(id));
      if (!data) {
        return res.status(404).json({ message: "Festive event not found" });
      }
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { title, description, id_owner } = req.body;
      const data = await festiveEventService.createEvent(
        title,
        description,
        id_owner,
      );
      res.status(201).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, id_owner } = req.body;
      const data = await festiveEventService.updateEvent(
        Number(id),
        title,
        description,
        id_owner,
      );
      if (!data) {
        return res.status(404).json({ message: "Festive event not found" });
      }
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await festiveEventService.deleteEvent(Number(id));
      if (!data) {
        return res.status(404).json({ message: "Festive event not found" });
      }
      res.status(200).json({ message: "Festive event deleted" });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
};

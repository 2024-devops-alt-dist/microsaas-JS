import { Request, Response } from "express";

export const itemsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const data = "le back est bien connecté";
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(200).json({ msg: error, message: "y a une erreur" });
    }
  },
};

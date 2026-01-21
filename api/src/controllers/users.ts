import { Request, Response } from "express";
import { pool } from "../db/config";

export const usersController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const data = await pool.query("SELECT * FROM users");
      res.status(200).json({ data: data.rows });
    } catch (error) {
      res.status(200).json({ msg: error, message: "y a une erreur" });
    }
  },
};

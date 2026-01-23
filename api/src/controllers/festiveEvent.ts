import { Request, Response } from "express";
import { pool } from "../db/config";

export const festiveEventController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const data = await pool.query("SELECT * FROM festive_event");
      res.status(200).json({ data: data.rows });
    } catch (error) {
      res.status(200).json({ msg: error, message: "y a une erreur" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await pool.query(
        "SELECT * FROM festive_event WHERE id = $1",
        [id],
      );
      if (data.rows.length === 0) {
        return res.status(404).json({ message: "Festive event not found" });
      }
      res.status(200).json({ data: data.rows[0] });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { title, description, id_owner } = req.body;
      const data = await pool.query(
        "INSERT INTO festive_event (title, description, id_owner) VALUES ($1, $2, $3) RETURNING *",
        [title, description, id_owner],
      );
      res.status(201).json({ data: data.rows[0] });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, id_owner } = req.body;
      const data = await pool.query(
        "UPDATE festive_event SET title = $1, description = $2, id_owner = $3 WHERE id = $4 RETURNING *",
        [title, description, id_owner, id],
      );
      if (data.rows.length === 0) {
        return res.status(404).json({ message: "Festive event not found" });
      }
      res.status(200).json({ data: data.rows[0] });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await pool.query(
        "DELETE FROM festive_event WHERE id = $1 RETURNING *",
        [id],
      );
      if (data.rows.length === 0) {
        return res.status(404).json({ message: "Festive event not found" });
      }
      res.status(200).json({ message: "Festive event deleted" });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
};

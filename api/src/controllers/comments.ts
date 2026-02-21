import { Request, Response } from "express";
import { pool } from "../db/config";

export const commentsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const data = await pool.query(
        "SELECT * FROM comments ORDER BY timestamp DESC",
      );
      res.status(200).json({ data: data.rows });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await pool.query("SELECT * FROM comments WHERE id = $1", [
        id,
      ]);
      if (data.rows.length === 0) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({ data: data.rows[0] });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { message, id_user, id_gift, is_public } = req.body;
      const data = await pool.query(
        "INSERT INTO comments (message, id_user, id_gift, is_public) VALUES ($1, $2, $3, $4) RETURNING *",
        [message, id_user, id_gift, is_public ?? false],
      );
      res.status(201).json({ data: data.rows[0] });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { message, is_public } = req.body;
      const data = await pool.query(
        "UPDATE comments SET message = $1, is_public = $2, is_edited = true, timestamp_edited = now() WHERE id = $3 RETURNING *",
        [message, is_public, id],
      );
      if (data.rows.length === 0) {
        return res.status(404).json({ message: "Comment not found" });
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
        "DELETE FROM comments WHERE id = $1 RETURNING *",
        [id],
      );
      if (data.rows.length === 0) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
};

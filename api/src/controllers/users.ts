import { Request, Response } from "express";
import { pool } from "../db/config";

export const usersController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const data = await pool.query("SELECT * FROM users");
      res.status(200).json({ data: data.rows });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      if (data.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ data: data.rows[0] });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { email, name, password } = req.body;
      const data = await pool.query(
        "INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *",
        [email, name, password],
      );
      res.status(201).json({ data: data.rows[0] });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { email, name, password } = req.body;
      const data = await pool.query(
        "UPDATE users SET email = $1, name = $2, password = $3 WHERE id = $4 RETURNING *",
        [email, name, password, id],
      );
      if (data.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
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
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id],
      );
      if (data.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
};

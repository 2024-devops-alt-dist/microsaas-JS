import { Request, Response } from "express";
import { pool } from "../db/config";

export const giftsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const data = await pool.query("SELECT * FROM gifts");
      res.status(200).json({ data: data.rows });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await pool.query("SELECT * FROM gifts WHERE id = $1", [id]);
      if (data.rows.length === 0) {
        return res.status(404).json({ message: "Gift not found" });
      }
      res.status(200).json({ data: data.rows[0] });
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
      const data = await pool.query(
        "INSERT INTO gifts (title, description, image_url, product_link, id_wishing_user, is_offered, multiple_gifters, id_author_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [
          title,
          description,
          image_url,
          product_link,
          id_wishing_user,
          is_offered ?? false,
          multiple_gifters ?? false,
          id_author_user,
        ],
      );
      res.status(201).json({ data: data.rows[0] });
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
      const data = await pool.query(
        "UPDATE gifts SET title = $1, description = $2, image_url = $3, product_link = $4, id_wishing_user = $5, is_offered = $6, multiple_gifters = $7, id_author_user = $8 WHERE id = $9 RETURNING *",
        [
          title,
          description,
          image_url,
          product_link,
          id_wishing_user,
          is_offered ?? false,
          multiple_gifters ?? false,
          id_author_user,
          id,
        ],
      );
      if (data.rows.length === 0) {
        return res.status(404).json({ message: "Gift not found" });
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
        "DELETE FROM gifts WHERE id = $1 RETURNING *",
        [id],
      );
      if (data.rows.length === 0) {
        return res.status(404).json({ message: "Gift not found" });
      }
      res.status(200).json({ message: "Gift deleted" });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
};

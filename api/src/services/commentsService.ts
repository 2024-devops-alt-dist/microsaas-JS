import { pool } from "../db/config";

export const commentsService = {
  getAll: async () => {
    const data = await pool.query(
      "SELECT * FROM comments ORDER BY timestamp DESC",
    );
    return data.rows;
  },

  getById: async (id: number) => {
    const data = await pool.query("SELECT * FROM comments WHERE id = $1", [id]);
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },

  create: async (
    message: string,
    id_user: number,
    id_gift: number,
    is_public: boolean,
  ) => {
    const data = await pool.query(
      "INSERT INTO comments (message, id_user, id_gift, is_public) VALUES ($1, $2, $3, $4) RETURNING *",
      [message, id_user, id_gift, is_public],
    );
    return data.rows[0];
  },

  update: async (id: number, message: string, is_public: boolean) => {
    const data = await pool.query(
      "UPDATE comments SET message = $1, is_public = $2, is_edited = true, timestamp_edited = now() WHERE id = $3 RETURNING *",
      [message, is_public, id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },

  delete: async (id: number) => {
    const data = await pool.query(
      "DELETE FROM comments WHERE id = $1 RETURNING *",
      [id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
};

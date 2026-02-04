import { pool } from "../db/config";

export const usersService = {
  getAllUsers: async () => {
    const data = await pool.query("SELECT * FROM users");
    return data.rows;
  },

  getUserById: async (id: number) => {
    const data = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },

  createUser: async (email: string, name: string, password: string) => {
    const data = await pool.query(
      "INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *",
      [email, name, password],
    );
    return data.rows[0];
  },

  updateUser: async (
    id: number,
    email: string,
    name: string,
    password: string,
  ) => {
    const data = await pool.query(
      "UPDATE users SET email = $1, name = $2, password = $3 WHERE id = $4 RETURNING *",
      [email, name, password, id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },

  deleteUser: async (id: number) => {
    const data = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
};

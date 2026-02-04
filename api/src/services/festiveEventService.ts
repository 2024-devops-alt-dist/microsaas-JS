import { pool } from "../db/config";

export const festiveEventService = {
  getAllEvents: async () => {
    const data = await pool.query("SELECT * FROM festive_event");
    return data.rows;
  },

  getEventById: async (id: number) => {
    const data = await pool.query("SELECT * FROM festive_event WHERE id = $1", [
      id,
    ]);
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },

  createEvent: async (
    title: string,
    description: string | null,
    id_owner: number,
  ) => {
    const data = await pool.query(
      "INSERT INTO festive_event (title, description, id_owner) VALUES ($1, $2, $3) RETURNING *",
      [title, description, id_owner],
    );
    return data.rows[0];
  },

  updateEvent: async (
    id: number,
    title: string,
    description: string | null,
    id_owner: number,
  ) => {
    const data = await pool.query(
      "UPDATE festive_event SET title = $1, description = $2, id_owner = $3 WHERE id = $4 RETURNING *",
      [title, description, id_owner, id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },

  deleteEvent: async (id: number) => {
    const data = await pool.query(
      "DELETE FROM festive_event WHERE id = $1 RETURNING *",
      [id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
};

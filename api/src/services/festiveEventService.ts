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

  getEventsForParticipant: async (userId: number) => {
    const data = await pool.query(
      `SELECT DISTINCT fe.*
       FROM festive_event fe
       INNER JOIN users_events ue ON ue.id_event = fe.id
       WHERE ue.id_user = $1
       ORDER BY fe.id ASC`,
      [userId],
    );
    return data.rows;
  },

  getParticipantsForEvent: async (eventId: number) => {
    const data = await pool.query(
      `WITH event_participants AS (
         SELECT DISTINCT ue.id_user
         FROM users_events ue
         WHERE ue.id_event = $1
       )
       SELECT
         u.id,
         u.name,
         COALESCE(
           json_agg(
             json_build_object(
               'id', g.id,
               'title', g.title,
               'description', g.description,
               'image_url', g.image_url,
               'product_link', g.product_link,
               'is_offered', g.is_offered,
               'multiple_gifters', g.multiple_gifters,
               'offering_user_ids', COALESCE(
                 (
                   SELECT json_agg(ug.id_user ORDER BY ug.id_user)
                   FROM users_gifts ug
                   WHERE ug.id_gift = g.id
                 ),
                 '[]'::json
               )
             )
             ORDER BY g.id
           ) FILTER (WHERE g.id IS NOT NULL),
           '[]'::json
         ) AS gifts
       FROM event_participants ep
       INNER JOIN users u ON u.id = ep.id_user
       LEFT JOIN gifts g ON g.id_wishing_user = u.id
       GROUP BY u.id, u.name
       ORDER BY u.name ASC`,
      [eventId],
    );
    return data.rows;
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

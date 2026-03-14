import { pool } from "../db/config";

export const giftsService = {
  getAll: async () => {
    const data = await pool.query("SELECT * FROM gifts");
    return data.rows;
  },

  getById: async (id: number) => {
    const data = await pool.query("SELECT * FROM gifts WHERE id = $1", [id]);
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },

  create: async (
    title: string,
    description: string | null,
    image_url: string | null,
    product_link: string | null,
    id_wishing_user: number,
    is_offered: boolean,
    multiple_gifters: boolean,
    id_author_user: number,
  ) => {
    const data = await pool.query(
      "INSERT INTO gifts (title, description, image_url, product_link, id_wishing_user, is_offered, multiple_gifters, id_author_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        title,
        description,
        image_url,
        product_link,
        id_wishing_user,
        is_offered,
        multiple_gifters,
        id_author_user,
      ],
    );
    return data.rows[0];
  },

  update: async (
    id: number,
    title: string,
    description: string | null,
    image_url: string | null,
    product_link: string | null,
    id_wishing_user: number,
    is_offered: boolean,
    multiple_gifters: boolean,
    id_author_user: number,
  ) => {
    const data = await pool.query(
      "UPDATE gifts SET title = $1, description = $2, image_url = $3, product_link = $4, id_wishing_user = $5, is_offered = $6, multiple_gifters = $7, id_author_user = $8 WHERE id = $9 RETURNING *",
      [
        title,
        description,
        image_url,
        product_link,
        id_wishing_user,
        is_offered,
        multiple_gifters,
        id_author_user,
        id,
      ],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },

  updateOfferedStatus: async (id: number, is_offered: boolean) => {
    const data = await pool.query(
      "UPDATE gifts SET is_offered = $1 WHERE id = $2 RETURNING *",
      [is_offered, id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },

  getOfferingUserIds: async (giftId: number) => {
    const data = await pool.query(
      "SELECT id_user FROM users_gifts WHERE id_gift = $1 ORDER BY id_user ASC",
      [giftId],
    );
    return data.rows.map((row) => row.id_user as number);
  },

  addOfferingUser: async (giftId: number, userId: number) => {
    await pool.query(
      "INSERT INTO users_gifts (id_user, id_gift) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [userId, giftId],
    );
  },

  removeOfferingUser: async (giftId: number, userId: number) => {
    await pool.query(
      "DELETE FROM users_gifts WHERE id_user = $1 AND id_gift = $2",
      [userId, giftId],
    );
  },

  delete: async (id: number) => {
    const data = await pool.query(
      "DELETE FROM gifts WHERE id = $1 RETURNING *",
      [id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
};

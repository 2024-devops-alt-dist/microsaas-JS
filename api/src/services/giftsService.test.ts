import { giftsService } from "./giftsService";

jest.mock("../db/config", () => ({
  pool: {
    query: jest.fn(),
  },
}));

import { pool } from "../db/config";

describe("Gifts Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("returns all gifts", async () => {
      const mockData = { rows: [{ id: 1, title: "Toy" }] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);

      const result = await giftsService.getAll();

      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM gifts");
      expect(result).toEqual(mockData.rows);
    });

    it("throws when query fails", async () => {
      const mockError = new Error("db");
      (pool.query as jest.Mock).mockRejectedValue(mockError);

      await expect(giftsService.getAll()).rejects.toThrow(mockError);
    });
  });

  describe("getById", () => {
    it("returns gift when found", async () => {
      const mockData = { rows: [{ id: 1, title: "Toy" }] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);

      const result = await giftsService.getById(1);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM gifts WHERE id = $1",
        [1],
      );
      expect(result).toEqual(mockData.rows[0]);
    });

    it("returns null when not found", async () => {
      const mockData = { rows: [] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);

      const result = await giftsService.getById(1);

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("inserts and returns created gift", async () => {
      const mockRow = { id: 1, title: "Toy" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });

      const result = await giftsService.create(
        "Toy",
        "desc",
        "img",
        "link",
        1,
        true,
        false,
        2,
      );

      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO gifts (title, description, image_url, product_link, id_wishing_user, is_offered, multiple_gifters, id_author_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        ["Toy", "desc", "img", "link", 1, true, false, 2],
      );
      expect(result).toEqual(mockRow);
    });
  });

  describe("update", () => {
    it("updates and returns updated gift", async () => {
      const mockRow = { id: 1, title: "Toy" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });

      const result = await giftsService.update(
        1,
        "Toy",
        "desc",
        "img",
        "link",
        1,
        true,
        false,
        2,
      );

      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE gifts SET title = $1, description = $2, image_url = $3, product_link = $4, id_wishing_user = $5, is_offered = $6, multiple_gifters = $7, id_author_user = $8 WHERE id = $9 RETURNING *",
        ["Toy", "desc", "img", "link", 1, true, false, 2, 1],
      );
      expect(result).toEqual(mockRow);
    });

    it("returns null if no rows updated", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });
      const result = await giftsService.update(
        1,
        "Toy",
        "desc",
        "img",
        "link",
        1,
        true,
        false,
        2,
      );
      expect(result).toBeNull();
    });
  });

  describe("delete", () => {
    it("deletes and returns deleted gift", async () => {
      const mockRow = { id: 1, title: "Toy" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });

      const result = await giftsService.delete(1);

      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM gifts WHERE id = $1 RETURNING *",
        [1],
      );
      expect(result).toEqual(mockRow);
    });

    it("returns null when gift not found", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });
      const result = await giftsService.delete(1);
      expect(result).toBeNull();
    });
  });

  describe("updateOfferedStatus", () => {
    it("updates is_offered and returns updated gift", async () => {
      const mockRow = { id: 1, is_offered: true };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });

      const result = await giftsService.updateOfferedStatus(1, true);

      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE gifts SET is_offered = $1 WHERE id = $2 RETURNING *",
        [true, 1],
      );
      expect(result).toEqual(mockRow);
    });

    it("returns null when gift does not exist", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      const result = await giftsService.updateOfferedStatus(999, true);

      expect(result).toBeNull();
    });
  });

  describe("join table offering methods", () => {
    it("returns ordered offering user ids", async () => {
      (pool.query as jest.Mock).mockResolvedValue({
        rows: [{ id_user: 2 }, { id_user: 9 }],
      });

      const result = await giftsService.getOfferingUserIds(3);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT id_user FROM users_gifts WHERE id_gift = $1 ORDER BY id_user ASC",
        [3],
      );
      expect(result).toEqual([2, 9]);
    });

    it("adds offering user with conflict-safe insert", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      await giftsService.addOfferingUser(7, 4);

      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO users_gifts (id_user, id_gift) VALUES ($1, $2) ON CONFLICT DO NOTHING",
        [4, 7],
      );
    });

    it("removes offering user row", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      await giftsService.removeOfferingUser(7, 4);

      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM users_gifts WHERE id_user = $1 AND id_gift = $2",
        [4, 7],
      );
    });
  });
});

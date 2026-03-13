import { commentsService } from "./commentsService";

jest.mock("../db/config", () => ({
  pool: {
    query: jest.fn(),
  },
}));

import { pool } from "../db/config";

describe("Comments Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("returns all comments", async () => {
      const mockData = { rows: [{ id: 1, message: "hello" }] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);

      const result = await commentsService.getAll();

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM comments ORDER BY timestamp DESC",
      );
      expect(result).toEqual(mockData.rows);
    });

    it("throws when query fails", async () => {
      const mockError = new Error("db");
      (pool.query as jest.Mock).mockRejectedValue(mockError);

      await expect(commentsService.getAll()).rejects.toThrow(mockError);
    });
  });

  describe("getById", () => {
    it("returns comment when found", async () => {
      const mockData = { rows: [{ id: 1, message: "hello" }] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);

      const result = await commentsService.getById(1);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM comments WHERE id = $1",
        [1],
      );
      expect(result).toEqual(mockData.rows[0]);
    });

    it("returns null when not found", async () => {
      const mockData = { rows: [] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);

      const result = await commentsService.getById(1);

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("inserts and returns created comment", async () => {
      const mockRow = { id: 1, message: "hello" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });

      const result = await commentsService.create("hello", 1, 2, true);

      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO comments (message, id_user, id_gift, is_public) VALUES ($1, $2, $3, $4) RETURNING *",
        ["hello", 1, 2, true],
      );
      expect(result).toEqual(mockRow);
    });
  });

  describe("update", () => {
    it("updates and returns updated comment", async () => {
      const mockRow = { id: 1, message: "hello" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });

      const result = await commentsService.update(1, "hello", false);

      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE comments SET message = $1, is_public = $2, is_edited = true, timestamp_edited = now() WHERE id = $3 RETURNING *",
        ["hello", false, 1],
      );
      expect(result).toEqual(mockRow);
    });

    it("returns null if no rows updated", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      const result = await commentsService.update(1, "hello", false);

      expect(result).toBeNull();
    });
  });

  describe("delete", () => {
    it("deletes and returns deleted comment", async () => {
      const mockRow = { id: 1, message: "hello" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockRow] });

      const result = await commentsService.delete(1);

      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM comments WHERE id = $1 RETURNING *",
        [1],
      );
      expect(result).toEqual(mockRow);
    });

    it("returns null when comment not found", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      const result = await commentsService.delete(1);

      expect(result).toBeNull();
    });
  });
});

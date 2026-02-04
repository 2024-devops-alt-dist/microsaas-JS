import { usersService } from "./usersService";

jest.mock("../db/config", () => ({
  pool: {
    query: jest.fn(),
  },
}));

import { pool } from "../db/config";

describe("usersService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("returns rows on success", async () => {
      const mockRows = [
        { id: 1, email: "a@example.com", name: "A", password: "pwd" },
      ];
      (pool.query as jest.Mock).mockResolvedValue({ rows: mockRows });

      const result = await usersService.getAllUsers();

      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM users");
      expect(result).toEqual(mockRows);
    });

    it("throws when the query fails", async () => {
      const err = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(err);

      await expect(usersService.getAllUsers()).rejects.toThrow("DB error");
    });
  });

  describe("getUserById", () => {
    it("returns a user when found", async () => {
      const row = { id: 1, email: "a@example.com", name: "A", password: "pwd" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [row] });

      const result = await usersService.getUserById(1);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE id = $1",
        [1],
      );
      expect(result).toEqual(row);
    });

    it("returns null when not found", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      const result = await usersService.getUserById(1);

      expect(result).toBeNull();
    });

    it("throws on query error", async () => {
      const err = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(err);

      await expect(usersService.getUserById(1)).rejects.toThrow("DB error");
    });
  });

  describe("createUser", () => {
    it("inserts and returns the created user", async () => {
      const created = { id: 1, email: "a@e.com", name: "A", password: "pwd" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [created] });

      const result = await usersService.createUser("a@e.com", "A", "pwd");

      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *",
        ["a@e.com", "A", "pwd"],
      );
      expect(result).toEqual(created);
    });

    it("throws on query error", async () => {
      const err = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(err);

      await expect(
        usersService.createUser("a@e.com", "A", "pwd"),
      ).rejects.toThrow("DB error");
    });
  });

  describe("updateUser", () => {
    it("updates and returns the user when found", async () => {
      const updated = { id: 1, email: "b@e.com", name: "B", password: "pwd2" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [updated] });

      const result = await usersService.updateUser(1, "b@e.com", "B", "pwd2");

      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE users SET email = $1, name = $2, password = $3 WHERE id = $4 RETURNING *",
        ["b@e.com", "B", "pwd2", 1],
      );
      expect(result).toEqual(updated);
    });

    it("returns null when user not found", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      const result = await usersService.updateUser(1, "b@e.com", "B", "pwd2");

      expect(result).toBeNull();
    });

    it("throws on query error", async () => {
      const err = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(err);

      await expect(
        usersService.updateUser(1, "b@e.com", "B", "pwd2"),
      ).rejects.toThrow("DB error");
    });
  });

  describe("deleteUser", () => {
    it("deletes and returns the user when found", async () => {
      const deleted = { id: 1, email: "a@e.com", name: "A", password: "pwd" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [deleted] });

      const result = await usersService.deleteUser(1);

      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [1],
      );
      expect(result).toEqual(deleted);
    });

    it("returns null when user not found", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      const result = await usersService.deleteUser(1);

      expect(result).toBeNull();
    });

    it("throws on query error", async () => {
      const err = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(err);

      await expect(usersService.deleteUser(1)).rejects.toThrow("DB error");
    });
  });
});

import { festiveEventService } from "./festiveEventService";

jest.mock("../db/config", () => ({
  pool: {
    query: jest.fn(),
  },
}));

import { pool } from "../db/config";

describe("festiveEventService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllEvents", () => {
    it("returns rows on success", async () => {
      const mockRows = [
        { id: 1, title: "Christmas", description: "Xmas party", id_owner: 1 },
      ];
      (pool.query as jest.Mock).mockResolvedValue({ rows: mockRows });

      const result = await festiveEventService.getAllEvents();

      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM festive_event");
      expect(result).toEqual(mockRows);
    });

    it("throws when the query fails", async () => {
      const err = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(err);

      await expect(festiveEventService.getAllEvents()).rejects.toThrow(
        "DB error",
      );
    });
  });

  describe("getEventById", () => {
    it("returns an event when found", async () => {
      const row = {
        id: 1,
        title: "Christmas",
        description: "Xmas party",
        id_owner: 1,
      };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [row] });

      const result = await festiveEventService.getEventById(1);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM festive_event WHERE id = $1",
        [1],
      );
      expect(result).toEqual(row);
    });

    it("returns null when not found", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      const result = await festiveEventService.getEventById(1);

      expect(result).toBeNull();
    });

    it("throws on query error", async () => {
      const err = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(err);

      await expect(festiveEventService.getEventById(1)).rejects.toThrow(
        "DB error",
      );
    });
  });

  describe("createEvent", () => {
    it("inserts and returns the created event", async () => {
      const created = {
        id: 1,
        title: "Christmas",
        description: "Xmas party",
        id_owner: 1,
      };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [created] });

      const result = await festiveEventService.createEvent(
        "Christmas",
        "Xmas party",
        1,
      );

      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO festive_event (title, description, id_owner) VALUES ($1, $2, $3) RETURNING *",
        ["Christmas", "Xmas party", 1],
      );
      expect(result).toEqual(created);
    });

    it("throws on query error", async () => {
      const err = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(err);

      await expect(
        festiveEventService.createEvent("Christmas", "Xmas party", 1),
      ).rejects.toThrow("DB error");
    });
  });

  describe("updateEvent", () => {
    it("updates and returns the event when found", async () => {
      const updated = {
        id: 1,
        title: "New Year",
        description: "NY party",
        id_owner: 2,
      };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [updated] });

      const result = await festiveEventService.updateEvent(
        1,
        "New Year",
        "NY party",
        2,
      );

      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE festive_event SET title = $1, description = $2, id_owner = $3 WHERE id = $4 RETURNING *",
        ["New Year", "NY party", 2, 1],
      );
      expect(result).toEqual(updated);
    });

    it("returns null when event not found", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      const result = await festiveEventService.updateEvent(
        1,
        "New Year",
        "NY party",
        2,
      );

      expect(result).toBeNull();
    });

    it("throws on query error", async () => {
      const err = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(err);

      await expect(
        festiveEventService.updateEvent(1, "New Year", "NY party", 2),
      ).rejects.toThrow("DB error");
    });
  });

  describe("deleteEvent", () => {
    it("deletes and returns the event when found", async () => {
      const deleted = {
        id: 1,
        title: "Christmas",
        description: "Xmas party",
        id_owner: 1,
      };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [deleted] });

      const result = await festiveEventService.deleteEvent(1);

      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM festive_event WHERE id = $1 RETURNING *",
        [1],
      );
      expect(result).toEqual(deleted);
    });

    it("returns null when event not found", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      const result = await festiveEventService.deleteEvent(1);

      expect(result).toBeNull();
    });

    it("throws on query error", async () => {
      const err = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(err);

      await expect(festiveEventService.deleteEvent(1)).rejects.toThrow(
        "DB error",
      );
    });
  });
});

import { Request, Response } from "express";
import { festiveEventController } from "./festiveEvent";

// Mock the pool
jest.mock("../db/config", () => ({
  pool: {
    query: jest.fn(),
  },
}));

import { pool } from "../db/config";

const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("Festive Event Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return data on successful query", async () => {
      const mockData = { rows: [{ id: 1, name: "Christmas Party" }] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);

      await festiveEventController.getAll(mockRequest, mockResponse);

      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM festive_event");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData.rows });
    });

    it("should return error message on query failure", async () => {
      const mockError = new Error("Database error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);

      await festiveEventController.getAll(mockRequest, mockResponse);

      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM festive_event");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("getById", () => {
    it("should return festive event data on successful query", async () => {
      const mockData = {
        rows: [
          {
            id: 1,
            title: "Christmas Party",
            description: "Fun event",
            id_owner: 1,
          },
        ],
      };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await festiveEventController.getById(reqWithParams, mockResponse);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM festive_event WHERE id = $1",
        ["1"],
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockData.rows[0],
      });
    });

    it("should return 404 if festive event not found", async () => {
      const mockData = { rows: [] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await festiveEventController.getById(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Festive event not found",
      });
    });

    it("should return error message on query failure", async () => {
      const mockError = new Error("Database error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await festiveEventController.getById(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("create", () => {
    it("should create a new festive event and return it", async () => {
      const mockData = {
        rows: [
          {
            id: 1,
            title: "Christmas Party",
            description: "Fun event",
            id_owner: 1,
          },
        ],
      };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithBody = {
        body: {
          title: "Christmas Party",
          description: "Fun event",
          id_owner: 1,
        },
      } as unknown as Request;

      await festiveEventController.create(reqWithBody, mockResponse);

      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO festive_event (title, description, id_owner) VALUES ($1, $2, $3) RETURNING *",
        ["Christmas Party", "Fun event", 1],
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockData.rows[0],
      });
    });

    it("should return error message on query failure", async () => {
      const mockError = new Error("Database error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);
      const reqWithBody = {
        body: {
          title: "Christmas Party",
          description: "Fun event",
          id_owner: 1,
        },
      } as unknown as Request;

      await festiveEventController.create(reqWithBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("update", () => {
    it("should update festive event and return updated data", async () => {
      const mockData = {
        rows: [
          {
            id: 1,
            title: "New Year Party",
            description: "Updated event",
            id_owner: 2,
          },
        ],
      };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: {
          title: "New Year Party",
          description: "Updated event",
          id_owner: 2,
        },
      } as unknown as Request;

      await festiveEventController.update(reqWithParamsAndBody, mockResponse);

      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE festive_event SET title = $1, description = $2, id_owner = $3 WHERE id = $4 RETURNING *",
        ["New Year Party", "Updated event", 2, "1"],
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockData.rows[0],
      });
    });

    it("should return 404 if festive event not found", async () => {
      const mockData = { rows: [] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: {
          title: "New Year Party",
          description: "Updated event",
          id_owner: 2,
        },
      } as unknown as Request;

      await festiveEventController.update(reqWithParamsAndBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Festive event not found",
      });
    });

    it("should return error message on query failure", async () => {
      const mockError = new Error("Database error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: {
          title: "New Year Party",
          description: "Updated event",
          id_owner: 2,
        },
      } as unknown as Request;

      await festiveEventController.update(reqWithParamsAndBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("delete", () => {
    it("should delete festive event and return success message", async () => {
      const mockData = { rows: [{ id: 1, title: "Christmas Party" }] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await festiveEventController.delete(reqWithParams, mockResponse);

      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM festive_event WHERE id = $1 RETURNING *",
        ["1"],
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Festive event deleted",
      });
    });

    it("should return 404 if festive event not found", async () => {
      const mockData = { rows: [] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await festiveEventController.delete(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Festive event not found",
      });
    });

    it("should return error message on query failure", async () => {
      const mockError = new Error("Database error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await festiveEventController.delete(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });
});

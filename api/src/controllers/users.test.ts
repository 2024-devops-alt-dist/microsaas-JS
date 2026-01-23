import { Request, Response } from "express";
import { usersController } from "./users";

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

describe("Users Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return data on successful query", async () => {
      const mockData = { rows: [{ id: 1, name: "John Doe" }] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);

      await usersController.getAll(mockRequest, mockResponse);

      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM users");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData.rows });
    });

    it("should return error message on query failure", async () => {
      const mockError = new Error("Database error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);

      await usersController.getAll(mockRequest, mockResponse);

      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM users");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("getById", () => {
    it("should return user data on successful query", async () => {
      const mockData = {
        rows: [{ id: 1, name: "John Doe", email: "john@example.com" }],
      };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await usersController.getById(reqWithParams, mockResponse);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE id = $1",
        ["1"],
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockData.rows[0],
      });
    });

    it("should return 404 if user not found", async () => {
      const mockData = { rows: [] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await usersController.getById(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });

    it("should return error message on query failure", async () => {
      const mockError = new Error("Database error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await usersController.getById(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("create", () => {
    it("should create a new user and return it", async () => {
      const mockData = {
        rows: [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            password: "pass",
          },
        ],
      };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithBody = {
        body: { email: "john@example.com", name: "John Doe", password: "pass" },
      } as unknown as Request;

      await usersController.create(reqWithBody, mockResponse);

      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *",
        ["john@example.com", "John Doe", "pass"],
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
        body: { email: "john@example.com", name: "John Doe", password: "pass" },
      } as unknown as Request;

      await usersController.create(reqWithBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("update", () => {
    it("should update user and return updated data", async () => {
      const mockData = {
        rows: [
          {
            id: 1,
            name: "Jane Doe",
            email: "jane@example.com",
            password: "newpass",
          },
        ],
      };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: {
          email: "jane@example.com",
          name: "Jane Doe",
          password: "newpass",
        },
      } as unknown as Request;

      await usersController.update(reqWithParamsAndBody, mockResponse);

      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE users SET email = $1, name = $2, password = $3 WHERE id = $4 RETURNING *",
        ["jane@example.com", "Jane Doe", "newpass", "1"],
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockData.rows[0],
      });
    });

    it("should return 404 if user not found", async () => {
      const mockData = { rows: [] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: {
          email: "jane@example.com",
          name: "Jane Doe",
          password: "newpass",
        },
      } as unknown as Request;

      await usersController.update(reqWithParamsAndBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });

    it("should return error message on query failure", async () => {
      const mockError = new Error("Database error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: {
          email: "jane@example.com",
          name: "Jane Doe",
          password: "newpass",
        },
      } as unknown as Request;

      await usersController.update(reqWithParamsAndBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("delete", () => {
    it("should delete user and return success message", async () => {
      const mockData = { rows: [{ id: 1, name: "John Doe" }] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await usersController.delete(reqWithParams, mockResponse);

      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        ["1"],
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User deleted",
      });
    });

    it("should return 404 if user not found", async () => {
      const mockData = { rows: [] };
      (pool.query as jest.Mock).mockResolvedValue(mockData);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await usersController.delete(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });

    it("should return error message on query failure", async () => {
      const mockError = new Error("Database error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await usersController.delete(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });
});

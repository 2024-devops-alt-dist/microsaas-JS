import { Request, Response } from "express";

jest.mock("../db/config", () => ({
  pool: {
    query: jest.fn(),
  },
}));

import { commentsController } from "./comments";
import { pool } from "../db/config";

const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("Comments Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("returns data on success", async () => {
      const mockData = [{ id: 1, message: "hi" }];
      (pool.query as jest.Mock).mockResolvedValue({ rows: mockData });

      await commentsController.getAll(mockRequest, mockResponse);

      expect(pool.query).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);

      await commentsController.getAll(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("getById", () => {
    it("returns comment on success", async () => {
      const mockData = { id: 1, message: "hi" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockData] });
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await commentsController.getById(reqWithParams, mockResponse);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM comments WHERE id = $1",
        ["1"],
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });

    it("returns 404 when not found", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await commentsController.getById(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Comment not found",
      });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await commentsController.getById(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("create", () => {
    it("creates and returns new comment", async () => {
      const mockData = { id: 1, message: "hello" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockData] });
      const reqWithBody = {
        body: {
          message: "hello",
          id_user: 1,
          id_gift: 2,
          is_public: true,
        },
      } as unknown as Request;

      await commentsController.create(reqWithBody, mockResponse);

      expect(pool.query).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);
      const reqWithBody = {
        body: { message: "hello", id_user: 1, id_gift: 2 },
      } as unknown as Request;

      await commentsController.create(reqWithBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("update", () => {
    it("updates and returns comment", async () => {
      const mockData = { id: 1, message: "updated" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockData] });
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: { message: "updated", is_public: false },
      } as unknown as Request;

      await commentsController.update(reqWithParamsAndBody, mockResponse);

      expect(pool.query).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });

    it("returns 404 when not found", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: { message: "updated", is_public: false },
      } as unknown as Request;

      await commentsController.update(reqWithParamsAndBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Comment not found",
      });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: { message: "updated", is_public: false },
      } as unknown as Request;

      await commentsController.update(reqWithParamsAndBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("delete", () => {
    it("deletes and returns success message", async () => {
      const mockData = { id: 1, message: "bye" };
      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockData] });
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await commentsController.delete(reqWithParams, mockResponse);

      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM comments WHERE id = $1 RETURNING *",
        ["1"],
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Comment deleted",
      });
    });

    it("returns 404 when not found", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await commentsController.delete(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Comment not found",
      });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("DB error");
      (pool.query as jest.Mock).mockRejectedValue(mockError);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await commentsController.delete(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });
});

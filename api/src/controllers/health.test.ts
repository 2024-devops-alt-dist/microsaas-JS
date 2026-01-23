import { Request, Response } from "express";
import { healthController } from "./health";

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

describe("Health Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return data on successful query", async () => {
    const mockData = { rows: [{ id: 1, name: "test" }] };
    (pool.query as jest.Mock).mockResolvedValue(mockData);

    await healthController.getAll(mockRequest, mockResponse);

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM test");
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData.rows });
  });

  it("should return error message on query failure", async () => {
    const mockError = new Error("Database error");
    (pool.query as jest.Mock).mockRejectedValue(mockError);

    await healthController.getAll(mockRequest, mockResponse);

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM test");
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: mockError,
      message: "y a une erreur",
    });
  });
});

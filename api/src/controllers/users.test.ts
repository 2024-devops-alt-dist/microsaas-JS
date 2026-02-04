import { Request, Response } from "express";

jest.mock("../services/usersService", () => ({
  usersService: {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  },
}));

import { usersController } from "./users";
import { usersService } from "../services/usersService";

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
    it("returns data on success", async () => {
      const mockData = [{ id: 1, email: "a@e.com", name: "A" }];
      (usersService.getAllUsers as jest.Mock).mockResolvedValue(mockData);

      await usersController.getAll(mockRequest, mockResponse);

      expect(usersService.getAllUsers).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("DB error");
      (usersService.getAllUsers as jest.Mock).mockRejectedValue(mockError);

      await usersController.getAll(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("getById", () => {
    it("returns user on success", async () => {
      const mockData = { id: 1, email: "a@e.com", name: "A", password: "pwd" };
      (usersService.getUserById as jest.Mock).mockResolvedValue(mockData);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await usersController.getById(reqWithParams, mockResponse);

      expect(usersService.getUserById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });

    it("returns 404 when not found", async () => {
      (usersService.getUserById as jest.Mock).mockResolvedValue(null);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await usersController.getById(reqWithParams, mockResponse);

      expect(usersService.getUserById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("DB error");
      (usersService.getUserById as jest.Mock).mockRejectedValue(mockError);
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
    it("creates and returns new user", async () => {
      const mockData = { id: 1, email: "a@e.com", name: "A", password: "pwd" };
      (usersService.createUser as jest.Mock).mockResolvedValue(mockData);
      const reqWithBody = {
        body: {
          email: "a@e.com",
          name: "A",
          password: "pwd",
        },
      } as unknown as Request;

      await usersController.create(reqWithBody, mockResponse);

      expect(usersService.createUser).toHaveBeenCalledWith(
        "a@e.com",
        "A",
        "pwd",
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("DB error");
      (usersService.createUser as jest.Mock).mockRejectedValue(mockError);
      const reqWithBody = {
        body: {
          email: "a@e.com",
          name: "A",
          password: "pwd",
        },
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
    it("updates and returns user", async () => {
      const mockData = {
        id: 1,
        email: "b@e.com",
        name: "B",
        password: "pwd2",
      };
      (usersService.updateUser as jest.Mock).mockResolvedValue(mockData);
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: {
          email: "b@e.com",
          name: "B",
          password: "pwd2",
        },
      } as unknown as Request;

      await usersController.update(reqWithParamsAndBody, mockResponse);

      expect(usersService.updateUser).toHaveBeenCalledWith(
        1,
        "b@e.com",
        "B",
        "pwd2",
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });

    it("returns 404 when not found", async () => {
      (usersService.updateUser as jest.Mock).mockResolvedValue(null);
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: {
          email: "b@e.com",
          name: "B",
          password: "pwd2",
        },
      } as unknown as Request;

      await usersController.update(reqWithParamsAndBody, mockResponse);

      expect(usersService.updateUser).toHaveBeenCalledWith(
        1,
        "b@e.com",
        "B",
        "pwd2",
      );
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("DB error");
      (usersService.updateUser as jest.Mock).mockRejectedValue(mockError);
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: {
          email: "b@e.com",
          name: "B",
          password: "pwd2",
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
    it("deletes and returns success message", async () => {
      const mockData = { id: 1, email: "a@e.com", name: "A" };
      (usersService.deleteUser as jest.Mock).mockResolvedValue(mockData);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await usersController.delete(reqWithParams, mockResponse);

      expect(usersService.deleteUser).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User deleted",
      });
    });

    it("returns 404 when not found", async () => {
      (usersService.deleteUser as jest.Mock).mockResolvedValue(null);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await usersController.delete(reqWithParams, mockResponse);

      expect(usersService.deleteUser).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("DB error");
      (usersService.deleteUser as jest.Mock).mockRejectedValue(mockError);
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

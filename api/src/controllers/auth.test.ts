import { Request, Response } from "express";
import { authController } from "./auth";
import { authService } from "../services/authService";

jest.mock("../services/authService");

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("Auth Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should create a new user and return it", async () => {
      const returnedUser = {
        id: 1,
        email: "a@b.com",
        name: "a@b.com",
        password: "hashed",
      };
      (authService.register as jest.Mock).mockResolvedValue(returnedUser);
      const reqWithBody = {
        body: { email: "a@b.com", password: "pass" },
      } as unknown as Request;

      await authController.register(reqWithBody, mockResponse);

      expect(authService.register).toHaveBeenCalledWith("a@b.com", "pass");
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: { id: 1, email: "a@b.com", name: "a@b.com" },
      });
    });

    it("should return 400 when email or password is missing", async () => {
      const reqMissing = { body: { email: "a@b.com" } } as unknown as Request;
      await authController.register(reqMissing, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "email and password required",
      });
    });

    it("should return error message on failure", async () => {
      const error = new Error("Bad things");
      (authService.register as jest.Mock).mockRejectedValue(error);
      const reqWithBody = {
        body: { email: "a@b.com", password: "pass" },
      } as unknown as Request;

      await authController.register(reqWithBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: error,
        message: "y a une erreur",
      });
    });
  });

  describe("login", () => {
    it("should return token on successful login", async () => {
      (authService.login as jest.Mock).mockResolvedValue("jwt-token");
      const reqWithBody = {
        body: { email: "a@b.com", password: "pass" },
      } as unknown as Request;

      await authController.login(reqWithBody, mockResponse);

      expect(authService.login).toHaveBeenCalledWith("a@b.com", "pass");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ token: "jwt-token" });
    });

    it("should return 400 when email or password missing", async () => {
      const reqMissing = { body: { email: "a@b.com" } } as unknown as Request;
      await authController.login(reqMissing, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "email and password required",
      });
    });

    it("should return 401 on invalid credentials", async () => {
      (authService.login as jest.Mock).mockRejectedValue(new Error("Invalid"));
      const reqWithBody = {
        body: { email: "a@b.com", password: "wrong" },
      } as unknown as Request;

      await authController.login(reqWithBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "invalid credentials",
      });
    });
  });

  describe("refresh", () => {
    it("should return new token when old token valid", async () => {
      (authService.refresh as jest.Mock).mockResolvedValue("new-token");
      const reqWithBody = { body: { token: "old" } } as unknown as Request;

      await authController.refresh(reqWithBody, mockResponse);

      expect(authService.refresh).toHaveBeenCalledWith("old");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ token: "new-token" });
    });

    it("should return 400 when token missing", async () => {
      const reqMissing = { body: {} } as unknown as Request;
      await authController.refresh(reqMissing, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "token required",
      });
    });

    it("should return 401 on invalid token", async () => {
      (authService.refresh as jest.Mock).mockRejectedValue(
        new Error("Invalid"),
      );
      const reqWithBody = { body: { token: "bad" } } as unknown as Request;

      await authController.refresh(reqWithBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "invalid token",
      });
    });
  });
});

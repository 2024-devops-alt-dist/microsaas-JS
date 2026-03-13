import { authenticate, AuthenticatedRequest } from "./auth";
import { Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

describe("authenticate middleware", () => {
  let mockReq: Partial<AuthenticatedRequest>;
  let mockRes: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("allows request with valid token and attaches user", () => {
    const payload = { id: 42, email: "u@v.com" };
    const token = jwt.sign(payload, JWT_SECRET);
    mockReq.headers = { authorization: `Bearer ${token}` } as unknown as Record<
      string,
      string
    >;

    authenticate(
      mockReq as AuthenticatedRequest,
      mockRes as unknown as Response<unknown, Record<string, unknown>>,
      next,
    );

    expect(next).toHaveBeenCalled();
    // user object should at least contain the original payload properties
    expect((mockReq as AuthenticatedRequest).user).toMatchObject(payload);
  });

  it("rejects when no authorization header", () => {
    mockReq.headers = {} as unknown as Record<string, string>;
    authenticate(
      mockReq as AuthenticatedRequest,
      mockRes as unknown as Response<unknown, Record<string, unknown>>,
      next,
    );

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "No token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects when token invalid", () => {
    mockReq.headers = { authorization: "Bearer invalid" } as unknown as Record<
      string,
      string
    >;
    authenticate(
      mockReq as AuthenticatedRequest,
      mockRes as unknown as Response<unknown, Record<string, unknown>>,
      next,
    );

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Invalid token" });
    expect(next).not.toHaveBeenCalled();
  });
});

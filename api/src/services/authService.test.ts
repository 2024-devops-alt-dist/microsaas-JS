import jwt from "jsonwebtoken";
import { authService } from "./authService";
import { usersService } from "./usersService";
import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

interface TokenPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}

jest.mock("./usersService");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

describe("authService", () => {
  describe("login", () => {
    it("should return a valid JWT when credentials match", async () => {
      // simulate a stored user record with hashed password
      const email = "test@example.com";
      const password = "password123";
      // manually hash using same scrypt logic
      const salt = randomBytes(16).toString("hex");
      const derivedKey = await promisify(scrypt)(password, salt, 64);
      const hashed = `${salt}:${(derivedKey as Buffer).toString("hex")}`;
      const user = { id: 5, email, password: hashed };

      // stub the usersService lookup
      (usersService.getUserByEmail as jest.Mock).mockResolvedValue(user);

      const token = await authService.login(email, password);
      expect(typeof token).toBe("string");

      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      expect(decoded.email).toBe(email);
      expect(decoded.id).toBe(user.id);
    });

    it("should reject when user not found", async () => {
      (usersService.getUserByEmail as jest.Mock).mockResolvedValue(null);
      await expect(authService.login("no@one.com", "pwd")).rejects.toThrow(
        "Invalid credentials",
      );
    });

    it("should reject when password is wrong", async () => {
      const email = "foo@bar.com";
      const password = "correct";
      const salt = randomBytes(16).toString("hex");
      const derivedKey = await promisify(scrypt)(password, salt, 64);
      const hashed = `${salt}:${(derivedKey as Buffer).toString("hex")}`;
      const user = { id: 9, email, password: hashed };
      (usersService.getUserByEmail as jest.Mock).mockResolvedValue(user);
      await expect(authService.login(email, "wrong")).rejects.toThrow(
        "Invalid credentials",
      );
    });
  });

  describe("refresh", () => {
    it("should sign a new token when provided a valid one", async () => {
      const payload = { id: 7, email: "r@example.com" };
      const oldToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
      const newToken = await authService.refresh(oldToken);

      const decoded = jwt.verify(newToken, JWT_SECRET) as TokenPayload;
      expect(decoded.id).toBe(payload.id);
      expect(decoded.email).toBe(payload.email);
    });

    it("should reject an invalid token", async () => {
      await expect(authService.refresh("bad")).rejects.toThrow("Invalid token");
    });
  });
});

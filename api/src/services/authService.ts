import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { usersService } from "./usersService";

interface TokenPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}

const scrypt = promisify(_scrypt);
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const TOKEN_LIFETIME = "1h";

export const authService = {
  register: async (email: string, password: string) => {
    // hash password using scrypt with a random salt
    const salt = randomBytes(16).toString("hex");
    const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
    const hashedPassword = `${salt}:${derivedKey.toString("hex")}`;

    // for now we'll use the email as the default name
    const name = email;

    const created = await usersService.createUser(email, name, hashedPassword);
    return created;
  },

  login: async (email: string, password: string) => {
    const user = await usersService.getUserByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const [salt, key] = user.password.split(":");
    const derived = (await scrypt(password, salt, 64)) as Buffer;
    if (derived.toString("hex") !== key) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: TOKEN_LIFETIME,
    });

    return token;
  },

  refresh: async (token: string) => {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
      // remove iat/exp to avoid warnings
      // drop iat/exp from payload; names unused intentionally
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { iat, exp, ...rest } = payload;
      const newToken = jwt.sign(rest, JWT_SECRET, {
        expiresIn: TOKEN_LIFETIME,
      });
      return newToken;
    } catch {
      throw new Error("Invalid token");
    }
  },
};

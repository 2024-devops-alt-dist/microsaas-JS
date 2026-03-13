import { Request, Response } from "express";
import { authService } from "../services/authService";

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, password, username } = req.body;
      if (!email || !password || !username) {
        return res
          .status(400)
          .json({ message: "email, password and username required" });
      }

      const user = await authService.register(email, password, username);
      // generate a token immediately after creating the user
      const token = await authService.login(email, password);

      // don't send password back in response
      const { id, name } = user;
      res.status(201).json({ data: { id, email, name }, token });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "email and password required" });
      }

      const token = await authService.login(email, password);
      res.status(200).json({ token });
    } catch {
      // do not reveal details on auth failure
      res.status(401).json({ message: "invalid credentials" });
    }
  },

  refresh: async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ message: "token required" });
      }
      const newToken = await authService.refresh(token);
      res.status(200).json({ token: newToken });
    } catch {
      res.status(401).json({ message: "invalid token" });
    }
  },
};

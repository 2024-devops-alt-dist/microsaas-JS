import { Request, Response } from "express";
import { usersService } from "../services/usersService";

export const usersController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const data = await usersService.getAllUsers();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await usersService.getUserById(Number(id));
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { email, name, password } = req.body;
      const data = await usersService.createUser(email, name, password);
      res.status(201).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { email, name, password } = req.body;
      const data = await usersService.updateUser(
        Number(id),
        email,
        name,
        password,
      );
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await usersService.deleteUser(Number(id));
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
};

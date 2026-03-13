import { Request, Response } from "express";
import { giftsController } from "./gifts";
import { giftsService } from "../services/giftsService";

jest.mock("../services/giftsService");

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("Gifts Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("returns all gifts", async () => {
      (giftsService.getAll as jest.Mock).mockResolvedValue([{ id: 1 }]);

      await giftsController.getAll({} as Request, mockResponse);

      expect(giftsService.getAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: [{ id: 1 }] });
    });

    it("handles service errors", async () => {
      const error = new Error("boom");
      (giftsService.getAll as jest.Mock).mockRejectedValue(error);

      await giftsController.getAll({} as Request, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: error,
        message: "y a une erreur",
      });
    });
  });

  describe("getById", () => {
    it("returns a gift when found", async () => {
      (giftsService.getById as jest.Mock).mockResolvedValue({ id: 1 });

      await giftsController.getById(
        { params: { id: "1" } } as unknown as Request,
        mockResponse,
      );

      expect(giftsService.getById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: { id: 1 } });
    });

    it("returns 404 when not found", async () => {
      (giftsService.getById as jest.Mock).mockResolvedValue(null);

      await giftsController.getById(
        { params: { id: "1" } } as unknown as Request,
        mockResponse,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Gift not found",
      });
    });
  });

  describe("create", () => {
    it("creates a gift and returns it", async () => {
      const gift = { id: 1 };
      (giftsService.create as jest.Mock).mockResolvedValue(gift);

      const req = {
        body: {
          title: "T",
          description: "d",
          image_url: null,
          product_link: null,
          id_wishing_user: 1,
          is_offered: false,
          multiple_gifters: false,
          id_author_user: 1,
        },
      } as unknown as Request;

      await giftsController.create(req, mockResponse);

      expect(giftsService.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: gift });
    });
  });

  describe("update", () => {
    it("updates a gift and returns it", async () => {
      const gift = { id: 1 };
      (giftsService.update as jest.Mock).mockResolvedValue(gift);

      const req = {
        params: { id: "1" },
        body: {
          title: "T",
          description: "d",
          image_url: null,
          product_link: null,
          id_wishing_user: 1,
          is_offered: false,
          multiple_gifters: false,
          id_author_user: 1,
        },
      } as unknown as Request;

      await giftsController.update(req, mockResponse);

      expect(giftsService.update).toHaveBeenCalledWith(
        1,
        "T",
        "d",
        null,
        null,
        1,
        false,
        false,
        1,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: gift });
    });

    it("returns 404 when gift not found", async () => {
      (giftsService.update as jest.Mock).mockResolvedValue(null);

      const req = {
        params: { id: "1" },
        body: {
          title: "T",
          description: "d",
          image_url: null,
          product_link: null,
          id_wishing_user: 1,
          is_offered: false,
          multiple_gifters: false,
          id_author_user: 1,
        },
      } as unknown as Request;

      await giftsController.update(req, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Gift not found",
      });
    });
  });

  describe("delete", () => {
    it("deletes a gift", async () => {
      (giftsService.delete as jest.Mock).mockResolvedValue({ id: 1 });

      await giftsController.delete(
        { params: { id: "1" } } as unknown as Request,
        mockResponse,
      );

      expect(giftsService.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Gift deleted",
      });
    });

    it("returns 404 when not found", async () => {
      (giftsService.delete as jest.Mock).mockResolvedValue(null);

      await giftsController.delete(
        { params: { id: "1" } } as unknown as Request,
        mockResponse,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Gift not found",
      });
    });
  });
});

import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
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

  describe("toggleOffered", () => {
    it("updates offered status and returns gift", async () => {
      const gift = { id: 1, is_offered: true };
      (giftsService.getById as jest.Mock).mockResolvedValue({
        id: 1,
        multiple_gifters: false,
      });
      (giftsService.getOfferingUserIds as jest.Mock)
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([42]);
      (giftsService.addOfferingUser as jest.Mock).mockResolvedValue(undefined);
      (giftsService.updateOfferedStatus as jest.Mock).mockResolvedValue(gift);

      const req = {
        params: { id: "1" },
        body: { is_offered: true },
        user: { id: 42 },
      } as unknown as AuthenticatedRequest;

      await giftsController.toggleOffered(req, mockResponse);

      expect(giftsService.getById).toHaveBeenCalledWith(1);
      expect(giftsService.addOfferingUser).toHaveBeenCalledWith(1, 42);
      expect(giftsService.updateOfferedStatus).toHaveBeenCalledWith(1, true);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: {
          ...gift,
          offering_user_ids: [42],
        },
      });
    });

    it("returns 400 when is_offered is not a boolean", async () => {
      const req = {
        params: { id: "1" },
        body: { is_offered: "true" },
        user: { id: 42 },
      } as unknown as AuthenticatedRequest;

      await giftsController.toggleOffered(req, mockResponse);

      expect(giftsService.getById).not.toHaveBeenCalled();
      expect(giftsService.updateOfferedStatus).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "is_offered must be a boolean",
      });
    });

    it("returns 403 when single-offerer gift is already offered by another user", async () => {
      (giftsService.getById as jest.Mock).mockResolvedValue({
        id: 1,
        multiple_gifters: false,
      });
      (giftsService.getOfferingUserIds as jest.Mock).mockResolvedValue([9]);

      const req = {
        params: { id: "1" },
        body: { is_offered: true },
        user: { id: 42 },
      } as unknown as AuthenticatedRequest;

      await giftsController.toggleOffered(req, mockResponse);

      expect(giftsService.addOfferingUser).not.toHaveBeenCalled();
      expect(giftsService.updateOfferedStatus).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "This gift is already offered by another user",
      });
    });

    it("allows current offering user to cancel offer", async () => {
      (giftsService.getById as jest.Mock).mockResolvedValue({
        id: 1,
        multiple_gifters: true,
      });
      (giftsService.getOfferingUserIds as jest.Mock)
        .mockResolvedValueOnce([42, 9])
        .mockResolvedValueOnce([9]);
      (giftsService.removeOfferingUser as jest.Mock).mockResolvedValue(
        undefined,
      );
      (giftsService.updateOfferedStatus as jest.Mock).mockResolvedValue({
        id: 1,
        is_offered: true,
      });

      const req = {
        params: { id: "1" },
        body: { is_offered: false },
        user: { id: 42 },
      } as unknown as AuthenticatedRequest;

      await giftsController.toggleOffered(req, mockResponse);

      expect(giftsService.removeOfferingUser).toHaveBeenCalledWith(1, 42);
      expect(giftsService.updateOfferedStatus).toHaveBeenCalledWith(1, false);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it("allows cancel when auth user id is a numeric string", async () => {
      (giftsService.getById as jest.Mock).mockResolvedValue({
        id: 1,
        multiple_gifters: true,
      });
      (giftsService.getOfferingUserIds as jest.Mock)
        .mockResolvedValueOnce([42, 9])
        .mockResolvedValueOnce([9]);
      (giftsService.removeOfferingUser as jest.Mock).mockResolvedValue(
        undefined,
      );
      (giftsService.updateOfferedStatus as jest.Mock).mockResolvedValue({
        id: 1,
        is_offered: true,
      });

      const req = {
        params: { id: "1" },
        body: { is_offered: false },
        user: { id: "42" },
      } as unknown as AuthenticatedRequest;

      await giftsController.toggleOffered(req, mockResponse);

      expect(giftsService.removeOfferingUser).toHaveBeenCalledWith(1, 42);
      expect(giftsService.updateOfferedStatus).toHaveBeenCalledWith(1, false);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it("returns 403 when user tries to cancel without offering", async () => {
      (giftsService.getById as jest.Mock).mockResolvedValue({
        id: 1,
        multiple_gifters: true,
      });
      (giftsService.getOfferingUserIds as jest.Mock).mockResolvedValue([9]);

      const req = {
        params: { id: "1" },
        body: { is_offered: false },
        user: { id: 42 },
      } as unknown as AuthenticatedRequest;

      await giftsController.toggleOffered(req, mockResponse);

      expect(giftsService.removeOfferingUser).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Only users currently offering this gift can cancel",
      });
    });
  });

  describe("toggleMultipleGifters", () => {
    it("updates multiple_gifters and returns gift", async () => {
      const gift = { id: 1, id_wishing_user: 9, multiple_gifters: true };
      (giftsService.getById as jest.Mock).mockResolvedValue({
        id: 1,
        id_wishing_user: 9,
      });
      (giftsService.updateMultipleGiftersStatus as jest.Mock).mockResolvedValue(
        gift,
      );

      const req = {
        params: { id: "1" },
        body: { multiple_gifters: true },
        user: { id: 42 },
      } as unknown as AuthenticatedRequest;

      await giftsController.toggleMultipleGifters(req, mockResponse);

      expect(giftsService.getById).toHaveBeenCalledWith(1);
      expect(giftsService.updateMultipleGiftersStatus).toHaveBeenCalledWith(
        1,
        true,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: gift });
    });

    it("returns 400 when multiple_gifters is not a boolean", async () => {
      const req = {
        params: { id: "1" },
        body: { multiple_gifters: "true" },
        user: { id: 42 },
      } as unknown as AuthenticatedRequest;

      await giftsController.toggleMultipleGifters(req, mockResponse);

      expect(giftsService.getById).not.toHaveBeenCalled();
      expect(giftsService.updateMultipleGiftersStatus).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "multiple_gifters must be a boolean",
      });
    });

    it("returns 403 when user is the gift owner", async () => {
      (giftsService.getById as jest.Mock).mockResolvedValue({
        id: 1,
        id_wishing_user: 42,
      });

      const req = {
        params: { id: "1" },
        body: { multiple_gifters: true },
        user: { id: 42 },
      } as unknown as AuthenticatedRequest;

      await giftsController.toggleMultipleGifters(req, mockResponse);

      expect(giftsService.updateMultipleGiftersStatus).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Gift owner cannot change multiple gifters",
      });
    });
  });
});

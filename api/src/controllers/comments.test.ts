import { Request, Response } from "express";
import { commentsController } from "./comments";
import { commentsService } from "../services/commentsService";

jest.mock("../services/commentsService");

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("Comments Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("returns all comments", async () => {
      (commentsService.getAll as jest.Mock).mockResolvedValue([{ id: 1 }]);

      await commentsController.getAll({} as Request, mockResponse);

      expect(commentsService.getAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: [{ id: 1 }] });
    });

    it("handles service errors", async () => {
      const error = new Error("boom");
      (commentsService.getAll as jest.Mock).mockRejectedValue(error);

      await commentsController.getAll({} as Request, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: error,
        message: "y a une erreur",
      });
    });
  });

  describe("getById", () => {
    it("returns a comment when found", async () => {
      (commentsService.getById as jest.Mock).mockResolvedValue({ id: 1 });

      await commentsController.getById(
        { params: { id: "1" } } as unknown as Request,
        mockResponse,
      );

      expect(commentsService.getById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: { id: 1 } });
    });

    it("returns 404 when not found", async () => {
      (commentsService.getById as jest.Mock).mockResolvedValue(null);

      await commentsController.getById(
        { params: { id: "1" } } as unknown as Request,
        mockResponse,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Comment not found",
      });
    });
  });

  describe("create", () => {
    it("creates a comment and returns it", async () => {
      const comment = { id: 1 };
      (commentsService.create as jest.Mock).mockResolvedValue(comment);

      const req = {
        body: {
          message: "hi",
          id_user: 1,
          id_gift: 2,
          is_public: false,
        },
      } as unknown as Request;

      await commentsController.create(req, mockResponse);

      expect(commentsService.create).toHaveBeenCalledWith("hi", 1, 2, false);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: comment });
    });
  });

  describe("update", () => {
    it("updates a comment and returns it", async () => {
      const comment = { id: 1 };
      (commentsService.update as jest.Mock).mockResolvedValue(comment);

      const req = {
        params: { id: "1" },
        body: { message: "hi", is_public: true },
      } as unknown as Request;

      await commentsController.update(req, mockResponse);

      expect(commentsService.update).toHaveBeenCalledWith(1, "hi", true);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: comment });
    });

    it("returns 404 when comment not found", async () => {
      (commentsService.update as jest.Mock).mockResolvedValue(null);

      const req = {
        params: { id: "1" },
        body: { message: "hi", is_public: true },
      } as unknown as Request;

      await commentsController.update(req, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Comment not found",
      });
    });
  });

  describe("delete", () => {
    it("deletes a comment", async () => {
      (commentsService.delete as jest.Mock).mockResolvedValue({ id: 1 });

      await commentsController.delete(
        { params: { id: "1" } } as unknown as Request,
        mockResponse,
      );

      expect(commentsService.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Comment deleted",
      });
    });

    it("returns 404 when not found", async () => {
      (commentsService.delete as jest.Mock).mockResolvedValue(null);

      await commentsController.delete(
        { params: { id: "1" } } as unknown as Request,
        mockResponse,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Comment not found",
      });
    });
  });
});

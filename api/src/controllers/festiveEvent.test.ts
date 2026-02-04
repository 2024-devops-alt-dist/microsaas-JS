import { Request, Response } from "express";

jest.mock("../services/festiveEventService", () => ({
  festiveEventService: {
    getAllEvents: jest.fn(),
    getEventById: jest.fn(),
    createEvent: jest.fn(),
    updateEvent: jest.fn(),
    deleteEvent: jest.fn(),
  },
}));

import { festiveEventController } from "./festiveEvent";
import { festiveEventService } from "../services/festiveEventService";

const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("Festive Event Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("returns data on success", async () => {
      const mockData = [{ id: 1, title: "Christmas Party" }];
      (festiveEventService.getAllEvents as jest.Mock).mockResolvedValue(
        mockData,
      );

      await festiveEventController.getAll(mockRequest, mockResponse);

      expect(festiveEventService.getAllEvents).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("Database error");
      (festiveEventService.getAllEvents as jest.Mock).mockRejectedValue(
        mockError,
      );

      await festiveEventController.getAll(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("getById", () => {
    it("returns event on success", async () => {
      const mockData = {
        id: 1,
        title: "Christmas Party",
        description: "Fun event",
        id_owner: 1,
      };
      (festiveEventService.getEventById as jest.Mock).mockResolvedValue(
        mockData,
      );
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await festiveEventController.getById(reqWithParams, mockResponse);

      expect(festiveEventService.getEventById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });

    it("returns 404 when not found", async () => {
      (festiveEventService.getEventById as jest.Mock).mockResolvedValue(null);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await festiveEventController.getById(reqWithParams, mockResponse);

      expect(festiveEventService.getEventById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Festive event not found",
      });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("Database error");
      (festiveEventService.getEventById as jest.Mock).mockRejectedValue(
        mockError,
      );
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await festiveEventController.getById(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("create", () => {
    it("creates and returns new event", async () => {
      const mockData = {
        id: 1,
        title: "Christmas Party",
        description: "Fun event",
        id_owner: 1,
      };
      (festiveEventService.createEvent as jest.Mock).mockResolvedValue(
        mockData,
      );
      const reqWithBody = {
        body: {
          title: "Christmas Party",
          description: "Fun event",
          id_owner: 1,
        },
      } as unknown as Request;

      await festiveEventController.create(reqWithBody, mockResponse);

      expect(festiveEventService.createEvent).toHaveBeenCalledWith(
        "Christmas Party",
        "Fun event",
        1,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("Database error");
      (festiveEventService.createEvent as jest.Mock).mockRejectedValue(
        mockError,
      );
      const reqWithBody = {
        body: {
          title: "Christmas Party",
          description: "Fun event",
          id_owner: 1,
        },
      } as unknown as Request;

      await festiveEventController.create(reqWithBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("update", () => {
    it("updates and returns event", async () => {
      const mockData = {
        id: 1,
        title: "New Year Party",
        description: "Updated event",
        id_owner: 2,
      };
      (festiveEventService.updateEvent as jest.Mock).mockResolvedValue(
        mockData,
      );
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: {
          title: "New Year Party",
          description: "Updated event",
          id_owner: 2,
        },
      } as unknown as Request;

      await festiveEventController.update(reqWithParamsAndBody, mockResponse);

      expect(festiveEventService.updateEvent).toHaveBeenCalledWith(
        1,
        "New Year Party",
        "Updated event",
        2,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });

    it("returns 404 when not found", async () => {
      (festiveEventService.updateEvent as jest.Mock).mockResolvedValue(null);
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: {
          title: "New Year Party",
          description: "Updated event",
          id_owner: 2,
        },
      } as unknown as Request;

      await festiveEventController.update(reqWithParamsAndBody, mockResponse);

      expect(festiveEventService.updateEvent).toHaveBeenCalledWith(
        1,
        "New Year Party",
        "Updated event",
        2,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Festive event not found",
      });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("Database error");
      (festiveEventService.updateEvent as jest.Mock).mockRejectedValue(
        mockError,
      );
      const reqWithParamsAndBody = {
        params: { id: "1" },
        body: {
          title: "New Year Party",
          description: "Updated event",
          id_owner: 2,
        },
      } as unknown as Request;

      await festiveEventController.update(reqWithParamsAndBody, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });

  describe("delete", () => {
    it("deletes and returns success message", async () => {
      const mockData = { id: 1, title: "Christmas Party" };
      (festiveEventService.deleteEvent as jest.Mock).mockResolvedValue(
        mockData,
      );
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await festiveEventController.delete(reqWithParams, mockResponse);

      expect(festiveEventService.deleteEvent).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Festive event deleted",
      });
    });

    it("returns 404 when not found", async () => {
      (festiveEventService.deleteEvent as jest.Mock).mockResolvedValue(null);
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await festiveEventController.delete(reqWithParams, mockResponse);

      expect(festiveEventService.deleteEvent).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Festive event not found",
      });
    });

    it("returns 500 on error", async () => {
      const mockError = new Error("Database error");
      (festiveEventService.deleteEvent as jest.Mock).mockRejectedValue(
        mockError,
      );
      const reqWithParams = { params: { id: "1" } } as unknown as Request;

      await festiveEventController.delete(reqWithParams, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        msg: mockError,
        message: "y a une erreur",
      });
    });
  });
});

import { FestiveEvent } from "../entities";
import { apiClient } from "../apiClient";

export const eventService = {
  getAllEvents: async (): Promise<FestiveEvent[]> => {
    const response = await apiClient.get("/festiveEvent");
    return response.data;
  },
};

/* import mockEventsData from "../data/mockEventsData.json";
import { Event } from "../../../entities";

const USE_MOCK = true;

const mockApi = {
    async getAll() {
    return [...mockEventsData];
  },
  async create(event: Event) {
    return { id: Date.now(), ...event };
  },
  async delete(id: number) {
    return { success: true };
  },
};

const realApi = {
    async getAll() { },
  async create(event:Event) {  },
  async delete(id:number) {  }
};

export const myService = USE_MOCK ? mockApi : realApi; */

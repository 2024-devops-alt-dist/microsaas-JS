/* import mockEventsData from "../data/mockEventsData.json";
import { FestiveEvent } from "../../../entities";

const USE_MOCK = true;

const mockApi = {
     getAll(){
    return mockEventsData;
  },
  create(event: FestiveEvent) {
    event.id = Date.now()
    return event;
  },
  delete(id: number) {
    return { success: true };
  },
};

const realApi = {
    async getAll() { },
  async create(event:FestiveEvent) {  },
  async delete(id:number) {  }
};

export const myService = USE_MOCK ? mockApi : realApi;
 */

import { integer, pgTable } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { festiveEventTable } from "./festiveEvent";

export const usersEventTable = pgTable("users_events", {
  id_user: integer()
    .notNull()
    .references(() => usersTable.id),
  id_event: integer()
    .notNull()
    .references(() => festiveEventTable.id),
});

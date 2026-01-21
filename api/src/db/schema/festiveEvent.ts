import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const festiveEventTable = pgTable("festive_event", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 100 }).notNull(),
  description: varchar({ length: 1000 }),
  id_owner: integer()
    .notNull()
    .references(() => usersTable.id),
});

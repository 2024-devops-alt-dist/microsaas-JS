import {
  integer,
  pgTable,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { giftsTable } from "./gifts";

export const commentsTable = pgTable("comments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  message: varchar({ length: 1000 }).notNull(),
  id_user: integer()
    .notNull()
    .references(() => usersTable.id),
  id_gift: integer()
    .notNull()
    .references(() => giftsTable.id),
  is_public: boolean().notNull().default(false),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  is_edited: boolean().notNull().default(false),
  timestamp_edited: timestamp("timestamp_edited"),
});

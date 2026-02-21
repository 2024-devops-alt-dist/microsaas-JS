import { integer, pgTable, varchar, boolean } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const giftsTable = pgTable("gifts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 100 }).notNull(),
  description: varchar({ length: 1000 }),
  image_url: varchar({ length: 255 }),
  product_link: varchar({ length: 255 }),
  id_wishing_user: integer()
    .notNull()
    .references(() => usersTable.id),
  is_offered: boolean().notNull().default(false),
  multiple_gifters: boolean().notNull().default(false),
  id_author_user: integer()
    .notNull()
    .references(() => usersTable.id),
});

import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
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
});

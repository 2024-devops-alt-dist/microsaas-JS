import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { giftsTable } from "./gifts";

export const usersGiftsTable = pgTable(
  "users_gifts",
  {
    id_user: integer()
      .notNull()
      .references(() => usersTable.id),
    id_gift: integer()
      .notNull()
      .references(() => giftsTable.id),
  },
  (table) => [
    primaryKey({
      columns: [table.id_user, table.id_gift],
    }),
  ],
);

CREATE TABLE "users_gifts" (
  "id_user" integer NOT NULL REFERENCES "users"("id"),
  "id_gift" integer NOT NULL REFERENCES "gifts"("id"),
  PRIMARY KEY("id_user", "id_gift")
);

ALTER TABLE "gifts" DROP COLUMN "offered_by_user_id";

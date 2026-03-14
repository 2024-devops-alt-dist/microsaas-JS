ALTER TABLE "gifts"
ADD COLUMN "offered_by_user_id" integer REFERENCES "users"("id");

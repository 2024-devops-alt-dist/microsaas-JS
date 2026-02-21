ALTER TABLE "comments" DROP CONSTRAINT "comments_id_gift_users_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "timestamp" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "timestamp" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "timestamp_edited" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_gift_gifts_id_fk" FOREIGN KEY ("id_gift") REFERENCES "public"."gifts"("id") ON DELETE no action ON UPDATE no action;
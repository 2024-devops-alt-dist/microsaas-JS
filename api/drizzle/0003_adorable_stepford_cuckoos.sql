ALTER TABLE "comments" ALTER COLUMN "timestamp_edited" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "timestamp_edited" DROP NOT NULL;
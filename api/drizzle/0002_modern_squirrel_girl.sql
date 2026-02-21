ALTER TABLE "comments" ALTER COLUMN "timestamp_edited" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "timestamp_edited" SET NOT NULL;
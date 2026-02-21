CREATE TABLE "comments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "comments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"message" varchar(1000) NOT NULL,
	"id_user" integer NOT NULL,
	"id_gift" integer NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"timestamp" "cal::local_datetime" DEFAULT now() NOT NULL,
	"is_edited" boolean DEFAULT false NOT NULL,
	"timestamp_edited" "cal::local_datetime"
);
--> statement-breakpoint
CREATE TABLE "festive_event" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "festive_event_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(100) NOT NULL,
	"description" varchar(1000),
	"id_owner" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gifts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gifts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(100) NOT NULL,
	"description" varchar(1000),
	"image_url" varchar(255),
	"product_link" varchar(255),
	"id_wishing_user" integer NOT NULL,
	"is_offered" boolean DEFAULT false NOT NULL,
	"multiple_gifters" boolean DEFAULT false NOT NULL,
	"id_author_user" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users_events" (
	"id_user" integer NOT NULL,
	"id_event" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_gift_users_id_fk" FOREIGN KEY ("id_gift") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "festive_event" ADD CONSTRAINT "festive_event_id_owner_users_id_fk" FOREIGN KEY ("id_owner") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gifts" ADD CONSTRAINT "gifts_id_wishing_user_users_id_fk" FOREIGN KEY ("id_wishing_user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gifts" ADD CONSTRAINT "gifts_id_author_user_users_id_fk" FOREIGN KEY ("id_author_user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_events" ADD CONSTRAINT "users_events_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_events" ADD CONSTRAINT "users_events_id_event_festive_event_id_fk" FOREIGN KEY ("id_event") REFERENCES "public"."festive_event"("id") ON DELETE no action ON UPDATE no action;
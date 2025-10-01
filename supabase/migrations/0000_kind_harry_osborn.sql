-- post_views table already exists, skipping creation
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"video_url" varchar(500) NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"thumbnail_url" varchar(500),
	"duration" integer,
	"category" varchar(100),
	"tags" text[],
	"is_published" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
-- post_views index already exists, skipping creation
--> statement-breakpoint
CREATE INDEX "idx_videos_published_at" ON "videos" USING btree ("published_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "idx_videos_category" ON "videos" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_videos_is_published" ON "videos" USING btree ("is_published");
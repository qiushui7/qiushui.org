CREATE TABLE "vlog_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	CONSTRAINT "vlog_categories_name_unique" UNIQUE("name"),
	CONSTRAINT "vlog_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
INSERT INTO "vlog_categories" ("name", "slug", "description") VALUES
	('General', 'general', 'General video content'),
	('Tutorial', 'tutorial', 'Tutorial videos'),
	('Tech', 'tech', 'Technology related videos');
--> statement-breakpoint
ALTER TABLE "videos" ADD COLUMN "category_id_temp" uuid;
--> statement-breakpoint
UPDATE "videos" SET "category_id_temp" = (SELECT id FROM "vlog_categories" WHERE slug = 'general' LIMIT 1);
--> statement-breakpoint
DROP INDEX "idx_videos_category";
--> statement-breakpoint
ALTER TABLE "videos" DROP COLUMN "category";
--> statement-breakpoint
ALTER TABLE "videos" RENAME COLUMN "category_id_temp" TO "category_id";
--> statement-breakpoint
ALTER TABLE "videos" ALTER COLUMN "category_id" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_category_id_vlog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."vlog_categories"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "idx_videos_category" ON "videos" USING btree ("category_id");
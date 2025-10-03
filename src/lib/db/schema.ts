import { pgTable, uuid, varchar, text, integer, timestamp, boolean, index, serial } from 'drizzle-orm/pg-core';

export const vlogCategories = pgTable('vlog_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description')
});

export const videos = pgTable('videos', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  videoUrl: varchar('video_url', { length: 500 }).notNull(),
  viewCount: integer('view_count').default(0).notNull(),
  publishedAt: timestamp('published_at', { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  // Additional fields
  thumbnailUrl: varchar('thumbnail_url', { length: 500 }),
  duration: integer('duration'), // in seconds
  categoryId: uuid('category_id').references(() => vlogCategories.id).notNull(),
  tags: text('tags').array(),
  location: varchar('location', { length: 255 }),
  isPublished: boolean('is_published').default(false).notNull()
}, (table) => ([
  index('idx_videos_published_at').on(table.publishedAt.desc()),
  index('idx_videos_category').on(table.categoryId),
  index('idx_videos_is_published').on(table.isPublished)
]));

export const postViews = pgTable('post_views', {
  id: serial('id').primaryKey(),
  postId: varchar('post_id', { length: 255 }).notNull().unique(),
  views: integer('views').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ([
  index('idx_post_views_post_id').on(table.postId)
]));

export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;
export type VlogCategory = typeof vlogCategories.$inferSelect;
export type NewVlogCategory = typeof vlogCategories.$inferInsert;
export type PostView = typeof postViews.$inferSelect;
export type NewPostView = typeof postViews.$inferInsert;

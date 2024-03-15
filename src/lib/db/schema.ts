import {
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const storeurl = pgTable("storeurl", {
    id: serial("id").primaryKey(),
    urlId: varchar("url_id", { length: 256 }).notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    userId: text("user_id").notNull(),
});

export type StoreUrlType = typeof storeurl.$inferInsert;


export const storefile = pgTable("storefile", {
    id: serial("id").primaryKey(),
    fileId: varchar("file_id", { length: 256 }).notNull(),
    filename: text("filename").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    userId: text("user_id").notNull(),
})

export type StoreFileType = typeof storefile.$inferInsert;
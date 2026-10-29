import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: integer({ mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer({ mode: "timestamp" }).notNull().$defaultFn(() => new Date()).$onUpdate(() => new Date()),
};

export const users = sqliteTable("users", {
  id: text().primaryKey(),
  username: text().notNull().unique(),
  email: text().notNull().unique(),
  steamId: text().notNull().unique(),
  emailVerified: integer({ mode: "boolean" }).notNull().default(false),
  role: text().notNull().default("user"),
  ...timestamps,
});

export const sessions = sqliteTable("sessions", {
  id: text().primaryKey(),
  userId: text().notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text().notNull().unique(),
  expiresAt: integer({ mode: "timestamp" }).notNull(),
  ipAddress: text(),
  userAgent: text(),
  ...timestamps,
});

export const accounts = sqliteTable("accounts", {
  id: text().primaryKey(),
  userId: text().notNull().references(() => users.id, { onDelete: "cascade" }),
  accountId: text().notNull(),
  providerId: text().notNull(),
  password: text(),
  ...timestamps,
});

export const posts = sqliteTable("posts", {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text().notNull(),
  description: text().notNull(),
  authorId: text().notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: integer({ mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});
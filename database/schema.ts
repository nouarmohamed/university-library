import {
  varchar,
  uuid,
  integer,
  text,
  pgTable,
  date,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

const STATUS_ENUM = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);
const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
const BORROW_STATUS_ENUM = pgEnum("borrow_status", ["BORROWED", "RETURNED"]);

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar("full_name", { length: 100 }).notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    universityId: integer("university_id").notNull().unique(),
    universityCard: text("university_card").notNull(),
    lastActivity: date("last_activity").defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    status: STATUS_ENUM("status").notNull().default("PENDING"),
    role: ROLE_ENUM("role").notNull().default("USER"),
});

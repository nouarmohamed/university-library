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

export const books = pgTable("books", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 255 }).notNull(),
    genre: text("genre").notNull(),
    rating: integer("rating").default(5).notNull(),
    description: text("description").notNull(),
    totalCopies: integer("total-copies").default(1).notNull(),
    availableCopies: integer("available-copies").default(1).notNull(),
    coverUrl: text("book-image").notNull(),
    coverColor: varchar("book-color", { length: 7 }).notNull(),
    videoUrl: text("book-trailer").notNull(),
    summary: text("summary").notNull(),
    status: BORROW_STATUS_ENUM('borrow_status').default('RETURNED').notNull(),
    createdAt: timestamp("created-at",  { withTimezone: true }).defaultNow(),
});

export const borrows = pgTable("borrow", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user-id").notNull().references(() => users.id),
  bookId: uuid("book-id").notNull().references(() => books.id),
  borrowDate: timestamp("borrow_date", { withTimezone: true }).defaultNow().notNull(),
  dueDate: date("due-date").notNull(),
  returnDate: date("return_date"),
  status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
  createdAt: timestamp("created-at",  { withTimezone: true }).defaultNow()
})

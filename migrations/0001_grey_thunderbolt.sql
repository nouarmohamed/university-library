CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"author" text NOT NULL,
	"genre" text NOT NULL,
	"rating" integer DEFAULT 5,
	"description" integer,
	"total-copies" integer DEFAULT 1,
	"available-copies" integer DEFAULT 1,
	"book-image" text,
	"book-color" text,
	"book-trailer" text,
	"summary" text,
	"borrow_status" "borrow_status" DEFAULT 'RETURNED',
	"created-at" date DEFAULT now(),
	CONSTRAINT "books_id_unique" UNIQUE("id")
);

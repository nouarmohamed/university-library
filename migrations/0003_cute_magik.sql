CREATE TABLE "borrow" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user-id" uuid NOT NULL,
	"book-id" uuid NOT NULL,
	"borrow_date" timestamp with time zone DEFAULT now() NOT NULL,
	"due-date" date NOT NULL,
	"return_date" date,
	"status" "borrow_status" DEFAULT 'BORROWED' NOT NULL,
	"created-at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "borrow_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "title" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "author" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "rating" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "available-copies" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "book-image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "book-color" SET DATA TYPE varchar(7);--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "book-color" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "book-trailer" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "summary" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "created-at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "created-at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_user-id_users_id_fk" FOREIGN KEY ("user-id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_book-id_books_id_fk" FOREIGN KEY ("book-id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;
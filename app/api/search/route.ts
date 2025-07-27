import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { ilike, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET =  async(req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";


  const foundedBooks = await db.select().from(books).where(
    or(
        ilike(books.title, `%${query}%`),
        ilike(books.author, `%${query}%`),
        ilike(books.genre, `%${query}%`)
    )).limit(20);

  return NextResponse.json(foundedBooks);
}
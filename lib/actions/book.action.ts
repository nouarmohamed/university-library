'use server';

import { db } from "@/database/drizzle";
import { books, borrows, users } from "@/database/schema";
import dayjs from "dayjs";
import { eq, sql } from "drizzle-orm";
import { workflowClient } from "../workflow";
import config from "../config";

export const addBook = async (params: BOOK) => {
    const {title, author, genre, rating, totalCopies, availableCopies, coverUrl, coverColor, videoUrl, summary} = params;

    try {
        const book =await db.insert(books).values({
            title,
            author,
            genre,
            rating,
            totalCopies,
            availableCopies,
            coverColor,
            coverUrl,
            videoUrl,
            summary,
        });
        if (!book) {
            return { success: false, error: "Failed to add the book" };
        }

        return { success: true };
    } catch (error) {
        console.error("Error creating book:", error);
        return { success: false, error: "Failed to add the book" };
    }
}

export const borrowBook = async ({userId, bookId}: BorrowBookParams) => {
    try {
        const book = await db.select({availableCopies: books.availableCopies}).from(books).where(eq(books.id, bookId)).limit(1)
        
        if (book.length < 1 || book[0].availableCopies < 1) {
            return {success: false, error: "Book is not available for borrowing"}
        }
        const dueDate = dayjs().add(15, "day").toDate().toDateString();

        const record = await db.insert(borrows).values({userId, bookId, dueDate, status: "BORROWED"})
        
        await db.update(books).set({ availableCopies: book[0].availableCopies - 1, status: "BORROWED" }).where(eq(books.id, bookId));
        const user = await db.select({email: users.email, fullName: users.fullName}).from(users).where(eq(users.id, userId)).limit(1);
        const borrowedBook = await db.select({title: books.title}).from(books).where(eq(books.id, bookId)).limit(1);

        const { workflowRunId } = await workflowClient.trigger({
            url: `${config.env.prodApiEndpoint}/api/workflows/borrowing`,
            body: {email: user[0].email, fullName: user[0].fullName, bookTitle: borrowedBook[0].title},
        })
        console.log(workflowRunId)
        
        return {success: true, data: JSON.parse(JSON.stringify(record)),};
    } catch (error) {
        console.log(error)
        return { success: false, error: "An error occurred while borrowing the book"};
    }
}

export async function getCounts() {
  const [userCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(users);
  const [bookCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(books);
  const [borrowCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(borrows);

  return {
    usersNumber: userCount.count,
    booksNumber: bookCount.count,
    borrowsNumber: borrowCount.count,
  };
}
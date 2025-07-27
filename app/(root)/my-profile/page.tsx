import { auth } from "@/auth"
import Badge from "@/components/Badge"
import ProfileBookCard from "@/components/ProfileBookCard"
import { db } from "@/database/drizzle"
import { books, borrows, users } from "@/database/schema"
import { eq } from "drizzle-orm"

const page = async () => {
    const session = await auth()
    const user = await db
        .select({
        userId: users.id,
        fullName: users.fullName,
        email: users.email,
        universityId: users.universityId,
        universityCard: users.universityCard,
        accountStatus: users.status
        })
        .from(users)
        .where(eq(users.id, session?.user?.id as string)).limit(1)

    const borrowedBooks = await db
        .select({
        borrowId: borrows.id,
        borrowDate: borrows.borrowDate,
        dueDate: borrows.dueDate,
        status: borrows.status,
        returnDate: borrows.returnDate,
        book: {
            id: books.id,
            title: books.title,
            author: books.author,
            coverUrl: books.coverUrl,
            genre: books.genre,
            coverColor: books.coverColor
        }
        })
        .from(borrows)
        .where(eq(borrows.userId, session?.user?.id as string))
        .innerJoin(books, eq(borrows.bookId, books.id));

    return (
        <main className="flex justify-between">
            <Badge {...user[0]}/>
            <section className="mt-10">
                <h2 className='text-2xl font-semibold'>Borrowed books</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-10">
                    {borrowedBooks.map((book) => (
                        <ProfileBookCard {...book} key={book.borrowId}/>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default page
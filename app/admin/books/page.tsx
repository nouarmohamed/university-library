import BookCover from "@/components/BookCover"
import { db } from "@/database/drizzle"
import { books } from "@/database/schema"
import { desc } from "drizzle-orm"

const page = async () => {
  const latestBooks = await db.select().from(books).orderBy(desc(books.createdAt)).limit(10)
  
  return (
    <div className='m-5 p-5 mb-20 bg-white rounded-xl'>
      <header className='flex justify-between'>
        <h2 className='text-lg font-semibold text-slate-900'>All Books</h2>
        <div></div>
      </header>
      <section className="mt-5">
        <table>
          <thead className="bg-light-300 text-sm text-dark-200 rounded-md">
            <tr>
              <td className="p-3">Book Title</td>
              <td>Author</td>
              <td>Genre</td>
              <td>Date Created</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody className="text-sm text-dark-200 font-medium">
            {latestBooks.map((book) => (
              <tr key={book.id}>
                <td className="flex gap-2 items-center p-3">
                  <BookCover cover={book.coverUrl as string} color={book.coverColor as string} variant="extraSmall"/>
                  <p>{book.title}</p>
                </td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.createdAt?.toDateString().slice(4, 15)}</td>
                <td>{book.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default page
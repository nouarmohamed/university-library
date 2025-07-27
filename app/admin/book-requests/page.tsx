import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { db } from "@/database/drizzle"
import { books, borrows, users } from "@/database/schema"
import { desc, eq } from "drizzle-orm"
import BookCover from "@/components/BookCover"

const page = async () => {
  const borrowRequests = await db.select({
      borrowId: borrows.id,
      borrowDate: borrows.borrowDate,
      returnDate: borrows.returnDate,
      dueDate: borrows.dueDate,
      status: borrows.status,
      book: {
        title: books.title,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
      },
      user: {
        fullName: users.fullName,
        email: users.email,
      }
    }).from(borrows)
    .leftJoin(books, eq(borrows.bookId, books.id))
    .leftJoin(users, eq(borrows.userId, users.id)).orderBy(desc(borrows.createdAt))
  return (
    <div className='m-5 p-5 mb-20 bg-white rounded-xl'>
      <header className='flex justify-between'>
        <h2 className='text-lg font-semibold text-slate-900'>Borrow Book Requests</h2>
        <div></div>
      </header>
      <section className="mt-5">
        <table>
          <thead className="bg-light-300 text-sm text-dark-200 rounded-md">
            <tr>
              <td className="p-3">Book</td>
              <td>User Requested</td>
              <td>Status</td>
              <td>Borrowed date</td>
              <td>Return date</td>
              <td>Due Date</td>
              <td>Receipt</td>
            </tr>
          </thead>
          <tbody className="text-sm text-dark-200 font-medium">
            {borrowRequests.map((request) => (
              <tr key={request.borrowId}>
                <td className="flex gap-2 items-center">
                  <Link href="/my-profile" className="">
                    <td className="flex gap-2 items-center p-3">
                      <BookCover cover={request.book?.coverUrl} color={request.book?.coverColor as string} variant="extraSmall"/>
                      <p>{request.book?.title}</p>
                    </td>
                  </Link>
                </td>
                <td className="flex gap-2 items-center p-3">
                  <Link href="/my-profile" className="flex-center gap-0.5">
                      <Avatar>
                          <AvatarFallback>{request ? getInitials(request.user?.fullName as string) : "CN"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-dark-400">{request.user?.fullName as string}</h3>
                        <p className="text-sm text-gray-500">{request.user?.email as string}</p>
                      </div>
                  </Link>
                </td>
                <td>{request.borrowDate?.toDateString().slice(4, 15)}</td>
                <td>{request.returnDate?.toString()}</td>
                <td>{request.dueDate?.toString().slice(0, 15)}</td>
                <td>
                    <button className="bg-green-50 text-green-700 p-1 flex gap-1">
                        <p>Approve Account</p>
                        <Image 
                            src='/icons/receipt-text.svg'
                            alt='Generate Receipt'
                            width={16}
                            height={16}
                        />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default page
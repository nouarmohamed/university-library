import BookCover from '@/components/BookCover'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { db } from '@/database/drizzle'
import { books, borrows, users } from '@/database/schema'
import { getCounts } from '@/lib/actions/book.action'
import { getInitials } from '@/lib/utils'
import { desc, eq } from 'drizzle-orm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const {usersNumber, booksNumber, borrowsNumber} = await getCounts()
  const borrowRequests = await db.select({
    borrowId: borrows.id,
    borrowDate: borrows.borrowDate,
    book: {
      title: books.title,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      author: books.author,
      genre: books.genre,
    },
    user: {
      fullName: users.fullName,
    }
  }).from(borrows)
  .leftJoin(books, eq(borrows.bookId, books.id))
  .leftJoin(users, eq(borrows.userId, users.id))

  const accountRequests = await db.select().from(users).where(eq(users.status, "PENDING"))
  const recentBooks = await db.select().from(books).orderBy(desc(books.createdAt)).limit(8)
  return (
    <div className='m-5 flex flex-col gap-5'>
      <section className='flex flex-row justify-between items-center gap-10'>
        <div className='bg-white w-full p-4 rounded-xl'>
          <p className='text-slate-600'>Barrowed Books</p>
          <h3 className='text-2xl font-bold mt-2 text-dark-400'>{usersNumber}</h3>
        </div>
        <div className='bg-white w-full p-4 rounded-xl'>
          <p className='text-slate-600'>Total Books</p>
          <h3 className='text-2xl font-bold mt-2'>{booksNumber}</h3>
        </div>
        <div className='bg-white w-full p-4 rounded-xl'>
          <p className='text-slate-600'>Total Borrows</p>
          <h3 className='text-2xl font-bold mt-2'>{borrowsNumber}</h3>
        </div>
      </section>

      <section className='flex flex-row justify-between gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <div className='bg-white p-4 rounded-xl'>
            <div className='flex flex-row justify-between items-center'>
              <h3 className='text-xl font-semibold text-dark-400'>Account Requests</h3>
              <Link 
                href="/admin/borrow-requests" 
                className='text-primary-admin bg-light-300 p-2 font-semibold rounded-md'
              >
                View All
              </Link>
            </div>
            <div className='flex flex-col gap-3 mt-4 max-h-72 overflow-hidden'>
              {borrowRequests.map((request) => (
                <div key={request.borrowId} className='relative flex gap-4 bg-light-300 p-4 rounded-xl'>
                  <BookCover color={request.book?.coverColor} cover={request.book?.coverUrl} variant='small' />
                  <div className='flex flex-col gap-1'>
                    <h4 className='font-semibold text-dark-400 line-clamp-1'>{request.book?.title}</h4>
                    <div className='p-1 bg-white absolute top-2 right-2 rounded-sm'><Image src='/icons/admin/eye.svg' alt='View' height={20} width={20}/></div>
                    <p className='text-sm text-slate-500 line-clamp-1'>{request.book?.author} . {request.book?.genre}</p>
                    <div className='flex gap-3'>
                      <div className='flex items-center gap-2'>
                        <Avatar className="size-6 text-xs">
                          <AvatarFallback className='font-semibold'>{request.user?.fullName ? getInitials(request.user?.fullName) : "CN"}</AvatarFallback>
                        </Avatar>
                        <p className='text-sm text-slate-600 max-w-full line-clamp-1'>{request.user?.fullName}</p>
                      </div>
                      <div className='flex items-center'>
                        <Image
                          src="/icons/admin/calendar.svg"
                          alt="Book Icon"
                          width={20}
                          height={20}
                        />
                        <p className='text-sm ml-1 text-slate-600'>{request.borrowDate!.toDateString().slice(4, 15)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white p-4 rounded-xl max-h-[380px] overflow-hidden'>
            <div className='flex flex-row justify-between items-center'>
              <h3 className='text-xl font-semibold text-dark-400'>Account Requests</h3>
              <Link 
                href="/admin/account-requests" 
                className='text-primary-admin bg-light-300 p-2 font-semibold rounded-md'
              >
                View All
              </Link>
            </div>
            <div className='flex flex-wrap gap-3 mt-4'>
              {accountRequests.map((request) => (
                <div key={request.id} className='bg-light-300 flex-center flex-col gap-0.5 px-2 py-5 rounded-xl w-44 overflow-clip'>
                  <Avatar className="size-12 mb-1.5">
                    <AvatarFallback>{request.fullName ? getInitials(request.fullName) : "CN"}</AvatarFallback>
                  </Avatar>
                  <h3 className='font-semibold text-dark-400 max-w-full line-clamp-1'>{request.fullName}</h3>
                  <p className='text-sm text-slate-500 max-w-full line-clamp-1'>{request.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-xl max-w-[375px] max-h-[700px] overflow-hidden'>
          <div className='flex flex-row justify-between items-center'>
            <h3 className='text-xl font-semibold text-dark-400'>Recently Added Books</h3>
            <Link 
              href="/admin/books" 
              className='text-primary-admin bg-light-300 p-2 font-semibold rounded-md'
            >
              View All
            </Link>
          </div>
          <div className='rounded-xl bg-light-300 w-full mt-4'>
            <Link href='/admin/books/new' className='flex items-center gap-3 rounded-xl bg-light-300 w-full p-4 mt-4'>
              <div className='rounded-full bg-white p-3'>
                <Image src="/icons/admin/plus.svg" alt="Add Book" width={24} height={24} />
              </div>
              <h4 className='font-semibold text-lg text-dark-400'>Add New Book</h4>
            </Link>
          </div>
          <div className='flex flex-col gap-5 mt-4'>
            {recentBooks.map((book) => (
              <div key={book.id} className='flex gap-4 w-full'>
                <BookCover color={book.coverColor} cover={book.coverUrl} variant='small' />
                <div className='flex flex-col gap-1 flex-1'>
                  <h4 className='font-semibold text-dark-400 line-clamp-1'>{book.title}</h4>
                  <p className='text-sm text-slate-500 line-clamp-1'>{book.author} . {book.genre}</p>
                  <div className='flex'>
                    <Image
                      src="/icons/admin/calendar.svg"
                      alt="Book Icon"
                      width={20}
                      height={20}
                    />
                    <p className='text-sm ml-1'>{book.createdAt!.toDateString().slice(4, 15)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default page
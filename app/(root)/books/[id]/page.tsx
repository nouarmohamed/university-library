import { auth } from '@/auth';
import BookCover from '@/components/BookCover';
import BookOverview from '@/components/BookOverview';
import BookVideo from '@/components/BookVideo';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { desc, eq } from 'drizzle-orm';
import Link from 'next/link';

const page = async ({params}: {params: Promise<{id: string}>}) => {
  const session = await auth()
  const id = (await params).id
  
  const [book] = await db.select().from(books).where(eq(books.id, id)).limit(1)
  const latestBooks = await db.select().from(books).orderBy(desc(books.createdAt)).limit(10)
  
  return (
    <main className='flex flex-col gap-20'>
      <BookOverview {...book} userId={session?.user?.id as string}/>
      <section className='flex flex-col sm:flex-row gap-16'>
        <div className='flex flex-col gap-10 max-w-xl'>
            <div className='flex flex-col gap-4'>
                <h2 className='text-light-100 text-3xl font-semibold'>Video</h2>
                <BookVideo videoUrl={book.videoUrl} coverUrl={book.coverUrl}/>
            </div>
            <div className='flex flex-col gap-4'>
                <h2 className='text-light-100 text-3xl font-semibold'>Summary</h2>
                <p>{book.description}</p>
            </div>
        </div>
        <div className='flex flex-col gap-5'>
            <h2 className='text-light-100 text-3xl font-semibold'>More similar books</h2>
            <ul className='flex flex-wrap flex-row gap-6'>
                {latestBooks.map((book) => (
                    <li key={book.id}>
                        <Link href={`/books/${book.id}`}>
                            <BookCover variant='meduim' color={book.coverColor} cover={book.coverUrl}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
      </section>
    </main>
  );
}

export default page
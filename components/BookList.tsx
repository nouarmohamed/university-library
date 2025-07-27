import BookCard from './BookCard'

interface Props {
    title: string
    books: BOOK[]
    query?: string
}
const BookList = ({title, books, query}: Props) => {
  return (
    <section className='flex flex-col gap-10 mt-10'>
        <h2 className='text-2xl font-semibold'>{title} <span className='text-primary-100'>{query}</span></h2>
        <div className='flex flex-row flex-wrap gap-10'>
            {books.map((book) => (
                <BookCard {...book} key={book.id}/>
            ))}
        </div>
    </section>
  )
}

export default BookList
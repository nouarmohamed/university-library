import { sampleBooks } from '@/constants'
import React from 'react'
import BookCard from './BookCard'

interface Props {
    title: string
}
const BookList = ({title}: Props) => {
  return (
    <section className='flex flex-col gap-10 mt-10'>
        <h2 className='text-2xl font-semibold'>{title}</h2>
        <div className='flex flex-row flex-wrap gap-14'>
            {sampleBooks.map((book) => (
                <BookCard {...book} key={book.id}/>
            ))}
        </div>
    </section>
  )
}

export default BookList
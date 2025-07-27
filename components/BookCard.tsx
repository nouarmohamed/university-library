import Link from "next/link"
import BookCover from "./BookCover"

const BookCard = ({id, title, genre, coverColor, coverUrl}: BOOK) => {
  return (
    <Link href={`/books/${id}`}>
      <BookCover cover={coverUrl} color={coverColor} />
      <div className="xs:max-w-40 max-w-32">
          <h3 className="mt-2 line-clamp-1 text-base font-semibold text-white xs:text-xl">{title}</h3>
          <p className="mt-1 line-clamp-1 text-sm italic text-light-100 xs:text-base">{genre}</p>
      </div>
    </Link>
  )
}

export default BookCard
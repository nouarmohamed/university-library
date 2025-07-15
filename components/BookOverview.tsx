import Image from "next/image"
import { Button } from "./ui/button"
import BookCover from "./BookCover"

const BookOverview = ({id, title, author, genre, rating, total_copies, available_copies, description, color, cover, video, summary,}: BOOK) => {
  return (
    <main className="flex flex-col-reverse sm:flex-row">
      <section className="flex flex-col ">
        <h1 className="text-5xl text-white font-semibold">{title}</h1>
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex flex-row items-center gap-4">
            <p>By <span>{author}</span></p>
            <p>Category: <span>{genre}</span></p>
            <div className="flex flex-row items-center">
              <Image src={"/icons/star.svg"} alt={"star"} width={20} height={20} />
              <p><span>{rating}</span> /5</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <p>Total books: <span>{total_copies}</span></p>
            <p>Available books: <span>{available_copies}</span></p>
          </div>
          <div>
            <p className="max-w-lg">{description}</p>
          </div>
          <Button className="flex bg-primary-100 text-dark-100 font-semibold rounded-sm w-min py-5 px-10 hover:bg-primary-100/80">
            <Image src={"/icons/book.svg"} alt={"book"} width={20} height={20} />
            <p className="font-bebas-neue text-lg">Borrow Book Request</p>
          </Button>
        </div>
      </section>
      <section className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            color={color}
            cover={cover}
          />

          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              color={color}
              cover={cover}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default BookOverview
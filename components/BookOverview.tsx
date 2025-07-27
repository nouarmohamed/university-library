import Image from "next/image"
import BookCover from "./BookCover"
import BorrowButton from "./BorrowButton"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"

interface Props extends BOOK {
  userId: string
}
const BookOverview = async ({id, title, author, genre, rating, totalCopies, availableCopies, description, coverColor, coverUrl, userId}: Props) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const borrowingEligibility = {
    isEligible: availableCopies! > 0 && user[0]?.status === "APPROVED",
    message:
      availableCopies! <= 0
        ? "Book is not available"
        : "You are not eligible to borrow this book",
  };

  return (
    <main className="flex flex-col-reverse sm:flex-row">
      <section className="flex flex-col ">
        <h1 className="text-5xl text-white font-semibold max-w-xl">{title}</h1>
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
            <p>Total books: <span>{totalCopies}</span></p>
            <p>Available books: <span>{availableCopies}</span></p>
          </div>
          <div>
            <p className="max-w-lg">{description}</p>
          </div>
          <BorrowButton userId={userId} bookId={id!} borrowingEligibility={borrowingEligibility}/>
        </div>
      </section>
      <section className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            color={coverColor}
            cover={coverUrl}
          />

          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              color={coverColor}
              cover={coverUrl}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default BookOverview
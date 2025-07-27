import Image from "next/image"
import BookCover from "./BookCover"
import { cn } from "@/lib/utils"

interface ProfileBookCardProps {
    borrowId: string
    borrowDate: Date
    dueDate: string
    returnDate: string | null
    status: 'BORROWED' | 'RETURNED'
    book: {
      id: string
      title: string
      author: string
      coverUrl: string
      genre: string
      coverColor: string
    }
}

const ProfileBookCard = ({
    borrowDate,
    dueDate,
    returnDate,
    status,
    book: {title, author, coverUrl, genre, coverColor }
}: ProfileBookCardProps) => {
  const daysLeft = Math.floor((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const returnStatus = status === 'RETURNED' ? 'Returned' : (daysLeft <= 0 ? 'Overdue' : 'Borrowed'); 
  return (
    <div className="w-min h-min dark-gradient rounded-2xl p-4 relative">
        {returnStatus === 'Overdue' && (
          <Image
            src="/icons/warning.svg"
            alt="Overdue Icon"
            width={24}
            height={24}
            className="absolute top-0 left-0"
          />
        )}
        <div className="rounded-2xl py-5 px-10" style={{ backgroundColor: coverColor }}>
            <div className="shadow-xl">
              <BookCover color={coverColor} cover={coverUrl} variant="meduim"/>
            </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <h2 className="text-white text-xl font-medium line-clamp-2">{title} - by {author}</h2>
          <p>{genre}</p>
          <div className="flex gap-2">
            <Image
              src='/icons/green-book.svg'
              alt="Book Icon"
              width={20}
              height={20}
            />
            <p>Borrowed on {borrowDate.toDateString().slice(4,10)}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Image
                src={returnStatus === 'Returned' ? '/icons/valid.svg' : returnStatus === 'Overdue' ? '/icons/warning.svg' : '/icons/calendar.svg'}
                alt="Returned status icon"
                width={20}
                height={20}
              />
              <p className={cn(returnStatus === 'Overdue' ? 'text-red-400' : '')}>{returnStatus === 'Overdue' ? 'Overdue Return' : returnStatus === 'Returned' ? `Returned on ${new Date(returnDate!).toDateString().slice(4, 10)}` : `${daysLeft} days left to due`}</p>
            </div>
            <div className="p-1.5 rounded-sm" style={{ backgroundColor: coverColor }}>
              <Image
                src='/icons/receipt-text.svg'
                alt="Receipt text"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProfileBookCard
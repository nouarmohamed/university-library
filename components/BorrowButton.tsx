"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { borrowBook } from '@/lib/actions/book.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props {
    userId: string
    bookId: string
    borrowingEligibility: {
        isEligible: boolean;
        message: string;
    };
}
const BorrowButton = ({userId, bookId, borrowingEligibility: { isEligible, message },}: Props) => {
    const router = useRouter();
    const [borrowing, setBorrowing] = useState(false);

    const handleClick = async () => {
        if (!isEligible) {
            toast.error("Error",{
                description: message,
            });
            return
        }

        setBorrowing(true);
        try {
            const res = await borrowBook({userId, bookId})
            if (res.success) {
                toast("Success!", {
                    description: "Book borrowed successfully",
                })
                router.push("/");
            }
            else {
                toast.error(`Error`, 
                {
                    description: res.error,
                })
            }
        } catch (error) {
            toast.error(`Error ${error}` , 
                {
                    description:"An error occurred while borrowing the book",
                })
        } finally {
            setBorrowing(false)
        }
    }
    return (
        <Button onClick={handleClick} disabled={borrowing} className="flex bg-primary-100 text-dark-100 font-semibold rounded-sm w-min py-5 px-10 mt-2 hover:bg-primary-100/80">
            <Image src={"/icons/book.svg"} alt={"book"} width={24} height={24} />
            <p className="font-bebas-neue text-xl leading-2 tracking-wide">{borrowing ? 'Borrowing...' : 'Borrow Book Request'}</p>
        </Button>
    )
}

export default BorrowButton
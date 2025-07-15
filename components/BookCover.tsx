import React from 'react'
import BookCoverSvg from './BookCoverSvg'
import Image from 'next/image';
import { cn } from '@/lib/utils';

type coverVariant = "extraSmall" | "small" | "meduim" | "regular" | "wide"

const variantStyles: Record<coverVariant, string> = {
    extraSmall: "w-[28.95px] h-10",
    small: "w-[55px] h-[76px]",
    meduim: "w-[144px] h-[199px]",
    regular: "xs:w-[174px] w-[114px] xs:h-[239px] h-[169px]",
    wide: "xs:w-[296px] w-[256px] xs:h-[404px] h-[354px]"
}

interface Props {
  color?: string;
  cover?: string;
  variant?: coverVariant;
  className?: string
}

const BookCover = ({
    color = "#012B48", 
    cover = "https://placehold.co/400x600.png", 
    variant = "regular", 
    className = ""
}: Props) => {
  return (
    <div className={cn('relative', variantStyles[variant], className)}>
        <BookCoverSvg coverColor={color}/>
        <div className='absolute z-10 left-[12%] w-[87.5%] h-[88%]'>
            <Image 
                src={cover}
                alt='Book cover'
                fill
                loading='lazy'
                className="rounded-sm object-fill"
            />
        </div>
    </div>
  )
}

export default BookCover
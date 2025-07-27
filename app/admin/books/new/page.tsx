import { Button } from '@/components/ui/button'
import React from 'react'
import BookForm from '@/components/admin/BookForm'
const page = () => {
  return (
    <div className='flex flex-col px-5'>
      <Button className='bg-white w-min hover:bg-white text-[#3A354E]'>Go back</Button>
      <div className='mt-7 mb-20'>
        <BookForm />
      </div>
    </div>
  )
}

export default page
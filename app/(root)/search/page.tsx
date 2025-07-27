"use client";

import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  query: z.string().min(2).max(50),
})

const Search = () => {
  const [books, setBooks] = useState<BOOK[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
      query: "",
      },
  })

  const reset = () => {
    form.reset();
    setQuery('')
  }
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 0) {
        setLoading(true);
        fetch(`/api/search?q=${query}`)
          .then((res) => res.json())
          .then((data) => {
            setBooks(data);
            setLoading(false);
          });
      } else {
        setBooks([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);
  
  return (
    <main className='flex flex-col gap-10 mt-10'>
      <div className='text-center flex flex-col items-center gap-4'>
        <p className='text-light-100 text-sm font-medium uppercase tracking-wide'>Discover Your Next Great Read:</p>
        <h1 className='text-5xl text-white font-medium max-w-xl'>Explore and Search for <span className='text-primary-100'>Any Book</span> In Our Library</h1>
        <Form {...form}>
        <form id='search-form' onSubmit={form.handleSubmit(() => {})} className="w-full max-w-lg mx-auto mt-2">
            <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <div className="relative">
                        <Image 
                            src='/icons/search-fill.svg'
                            alt="Search fill"
                            width={22}
                            height={22}
                            className="absolute left-3 top-2.5"
                        />
                        <Input placeholder="Search for a book..." {...field} value={query} onChange={(e) => {field.onChange(e);setQuery(e.target.value);  }} className="pl-10 bg-dark-300 w-full min-h-11 text-white font-semibold placeholder:text-light-100 border-none rounded-md"/>
                    </div>
                </FormControl>
                </FormItem>
            )}
            />
        </form>
        </Form>
      </div>
      {books.length === 0 ? (
        <div>
          <h2 className='text-2xl font-semibold'>Search Results for <span className='text-primary-100'>{query}</span></h2>
          <div className="flex flex-col gap-4 items-center max-w-78 mx-auto">
            <Image
              src="/icons/not-found.svg"
              alt='Not Found'
              width={50}
              height={50}
              className='size-50'
            />
            <h3 className='text-2xl font-medium text-white'>No Results Found</h3>
            <p className='text-sm text-center'>We couldn’t find any books matching your search. Try using different keywords or check for typos.</p>
            <Button onClick={reset} className='bg-primary-100 text-dark-100 text-2xl font-medium font-bebas-neue uppercase w-full py-6 rounded-sm mt-2'>Clear Search</Button>
          </div>
        </div>
      ) : (
        <BookList books={books} title={`Search Results for`} query={query} />
      )}
    </main>
  )
}

export default Search
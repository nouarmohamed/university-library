"use client"

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
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"

const formSchema = z.object({
  query: z.string().min(2).max(50),
})
const SearchForm = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        query: "",
        },
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(values.query)}`);
        }
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto mt-2">
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
                        <Input placeholder="Search for a book..." {...field} className="pl-10 bg-dark-300 w-full min-h-11 text-white font-semibold placeholder:text-light-100 border-none rounded-md"/>
                    </div>
                </FormControl>
                </FormItem>
            )}
            />
            <Button type="submit">Search</Button>
        </form>
        </Form>
    )
}

export default SearchForm
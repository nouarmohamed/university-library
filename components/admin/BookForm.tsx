"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { bookSchema } from "@/lib/validation"
import { Textarea } from "@/components/ui/textarea"
import FileUpload from "../FileUpload"
import ColorPicker from "../ColorPicker"
import { addBook } from "@/lib/actions/book.action"

const BookForm = () => {

    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: "",
            author: "",
            genre: "",
            totalCopies: 1,
            coverUrl: "",
            coverColor: "",
            videoUrl: "",
            summary: "",
        },
    })
    
    const onSubmit = async (values: z.infer<typeof bookSchema>) => {
        await addBook(values)
    }
    
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="book-form-label">Book Title</FormLabel>
                <FormControl>
                    <Input className="book-form-input" placeholder="Enter the book title" {...field} />
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="book-form-label">Author</FormLabel>
                <FormControl>
                    <Input className="book-form-input" placeholder="Enter the author name" {...field} />
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="book-form-label">Genre</FormLabel>
                <FormControl>
                    <Input className="book-form-input" placeholder="Enter the genre of the book" {...field} />
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="totalCopies"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="book-form-label">Total number of books</FormLabel>
                <FormControl>
                    <Input className="book-form-input" placeholder="Enter the total number of books" type="number" min={1} max={10000} {...field} />
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="coverUrl"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="book-form-label">Book Image</FormLabel>
                <FormControl>
                    <FileUpload onFileChange={field.onChange} fileType="image" formType='book'/>
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="coverColor"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="book-form-label">Book Primary Color</FormLabel>
                <FormControl>
                    <ColorPicker onFileChange={field.onChange}/>
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="book-form-label">Book Video</FormLabel>
                <FormControl>
                    <FileUpload onFileChange={field.onChange} fileType="video" formType='book'/>
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="book-form-label">Book Summary</FormLabel>
                <FormControl>
                    <Textarea className="book-form-input h-56" placeholder="Write a brief summary of the book" rows={20} {...field} />
                </FormControl>
                </FormItem>
            )}
            />
            <Button type="submit" className="book-form-btn">Submit</Button>
        </form>
        </Form>
    )
}

export default BookForm;
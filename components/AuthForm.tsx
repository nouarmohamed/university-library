"use client";

import { DefaultValues, FieldValues, Path, SubmitHandler, UseFormReturn } from "react-hook-form";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { FIELD_NAMES, FIELD_PLACEHOLDERS, FIELD_TYPES } from "@/constants";
import FileUpload from "./FileUpload";
import { useRouter } from "next/navigation";

interface Props<T extends FieldValues> {
    type: 'SIGN_IN' | 'SIGN_UP';
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const AuthForm = <T extends FieldValues>({type, schema, defaultValues, onSubmit}: Props<T>) => {
    const router = useRouter();
    const isSignIn = type === 'SIGN_IN';

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
    })
    
    const handleSubmit: SubmitHandler<T> = async (data) => {
        const result = await onSubmit(data);
        if (result && result.success) {
                toast("Success!", {
                    description: isSignIn ? "You have successfully signed in." : "Your account has been created successfully.",
                })
                router.push("/");
        } else {
            toast.error(`Error ${isSignIn ? "signing in" : "signing up"}`, 
            {
                description: isSignIn ? "Failed to sign in. Please try again." : "Failed to create account. Please try again.",
            })
        }
    }

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-white text-2xl font-semibold">{isSignIn ? "Welcome Back to the BookWise" : "Create Your Library Account"}</h2>
                <p>{isSignIn ? "Access the vast collection of resources, and stay updated" : "Please complete all fields and upload a valid university ID to gain access to the library"}</p>
            </div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 form">
                {Object.keys(defaultValues).map((field) => (
                <FormField
                    key={field}
                    control={form.control}
                    name={field as Path<T>}
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="label">{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                        <FormControl>
                        {field.name === "universityCard" ? <FileUpload onFileChange={field.onChange} fileType="image" formType='auth'/>
                            : <Input required className="input" type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} placeholder={FIELD_PLACEHOLDERS[field.name as keyof typeof FIELD_PLACEHOLDERS]} {...field} />
                        }
                        </FormControl>
                    </FormItem>
                    )}
                />
                ))}

                <Button className="bg-primary-100 text-dark-100 font-semibold w-full rounded-sm p-5 hover:bg-primary-100/80" type="submit">{isSignIn ? "Sign In" : "Sign Up"}</Button>
            </form>
            </Form>
            <div className="flex justify-center gap-1">
                <p>{isSignIn? "Don't have an account already? " : "Have an account already? " }</p>
                <Link className="text-primary-100" href={isSignIn? "/sign-up" : "/sign-in"}>{isSignIn? "Register here" : "Login"}</Link>
            </div>
        </div>
    );
}

export default AuthForm
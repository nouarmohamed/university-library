import { z } from "zod"
 
export const registerSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
  universityId: z.coerce.number(),
  password: z.string().min(8).max(100),
  universityCard: z.string().min(1).max(100).nonempty("University card is required"),
})

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

export const bookSchema = z.object({
  title: z.string().nonempty(),
  author: z.string().min(8).max(100),
  genre: z.string(),
  totalCopies: z.coerce.number().int(),
  coverUrl: z.string(),
  coverColor: z.string(),
  videoUrl: z.string(),
  summary: z.string().min(10).max(1000),
})

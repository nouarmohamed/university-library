import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { sendEmail } from "@/lib/workflow"
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm"

type UserState = 'ACTIVE' | 'NON_ACTIVE'

type InitialData = {
  email: string
  fullName: string
  bookTitle: string
}

const ONE_DAY = 24 * 60 * 60
const THREE_DAYS = ONE_DAY * 3
const ONE_MONTH = THREE_DAYS * 10


export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName, bookTitle } = context.requestPayload

  await context.run("borrow-book", async () => {
    await sendEmail({
      email,
      subject: `${fullName} you borrowed ${bookTitle}`,
      message: "borrow-book"
    })
  })

//   await context.sleepUntil("wait-for-5-seconds", Date.now() / 1000 + 3)

//   await context.run("return-book", async () => {
//     await sendEmail({
//       email,
//       subject: `hi ${fullName}`,
//       message: "how are you"
//     })
//   })

//   await context.sleep("wait-for-3-days", THREE_DAYS)
})

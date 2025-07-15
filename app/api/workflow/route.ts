import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { sendEmail } from "@/lib/workflow"
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm"

type UserState = 'ACTIVE' | 'NON_ACTIVE'

type InitialData = {
  email: string
  fullName: string
}

const ONE_DAY = 24 * 60 * 60
const THREE_DAYS = ONE_DAY * 3
const ONE_MONTH = THREE_DAYS * 10

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1)

  const lastActivity = new Date(user[0].lastActivity!)
  const now = new Date()
  const timeDifference = now.getTime() - lastActivity.getTime()

  if (timeDifference > THREE_DAYS && timeDifference <= ONE_MONTH)
    return "NON_ACTIVE"

  return "ACTIVE"
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload

  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: `Welcome to the University Library ${fullName}`,
      message: "You're all set. Start exploring books and resources now."
    })
  })

  await context.sleep("wait-for-3-days", THREE_DAYS)

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email)
    })

    if (state === "NON_ACTIVE") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: `We missed you ${fullName}`,
          message: "You haven’t used the library yet. Log in to explore, or reach out if you need help."
        })
      })
    } else if (state === "ACTIVE") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: `Great to see you reading ${fullName}`,
          message: "Glad you're using the library! Keep exploring — new titles are added regularly."
        })
      })
    }

    await context.sleep("wait-for-1-month", ONE_MONTH)
  }
})

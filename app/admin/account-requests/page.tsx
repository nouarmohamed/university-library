import UsersTable from "@/components/admin/UsersTable"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { desc, eq } from "drizzle-orm"

const page = async () => {
  const allUsers = await db.select().from(users).orderBy(desc(users.createdAt)).where(eq(users.status, 'PENDING'))
  
  return (
    <UsersTable tableTitle="Account Registration Requests" users={allUsers} />
  )
}

export default page
import UsersTable from "@/components/admin/UsersTable"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { desc } from "drizzle-orm"

const page = async () => {
  const allUsers = await db.select().from(users).orderBy(desc(users.createdAt))
  
  return (
    <UsersTable tableTitle="All Users" users={allUsers} />
  )
}

export default page
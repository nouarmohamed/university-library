import { auth } from '@/auth';
import NavBar from '@/components/NavBar';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { after } from 'next/server';
import { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  after(async() => {
    if (!session?.user?.id) return

    const user = await db.select().from(users).where(eq(users.id, session?.user?.id)).limit(1)
    
    if (user[0].lastActivity === new Date().toISOString().slice(0, 10)) return

    await db.update(users).set({lastActivity: new Date().toISOString().slice(0, 10)}).where(eq(users.id, session?.user?.id))
  })

  return (
    <main className='max-w-7xl'>
      <div className='max-w-7xl px-4 sm:px-10 md:px-16'>
        <NavBar session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  )
}

export default layout
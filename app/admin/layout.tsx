import { auth } from '@/auth';
import Header from '@/components/admin/Header';
import SideBar from '@/components/admin/SideBar';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();
    if (!session) redirect("/sign-in");
    // if (session?.user?.)

    return (
        <main className='max-w-7xl bg-white min-h-screen flex flex-row'>
            <SideBar session={session}/>
            <div className='bg-light-300 w-full'>
                <Header session={session}/>
                <div className="">{children}</div>
            </div>
        </main>
    )
}

export default layout
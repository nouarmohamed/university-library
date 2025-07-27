import { auth } from '@/auth';
import Image from 'next/image'
import { redirect } from 'next/navigation';
import { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");
  return (
    <main className='flex flex-col-reverse sm:flex-row relative text-light-100'>
        <section className='pattern flex-center my-auto h-full min-h-screen flex-1 flex-col gap-6 px-5 py-10'>
          <div className='form-gradient mx-auto flex max-w-xl flex-col gap-6 rounded-lg p-10'>
            <div className='flex flex-row gap-3'>
              <Image
                  src="/icons/logo.svg"
                  alt="auth illustration"
                  height={40}
                  width={40}
                  className='object-cover'
              />
              <h1 className='text-white text-3xl font-semibold'>BookWise</h1>
            </div>
            {children}
          </div>
        </section>

        <section className='sticky w-full h-40 sm:h-full sm:top-0 sm:flex-1'>
          <Image
              src="/images/auth-illustration.png"
              alt="auth illustration"
              height={1000}
              width={1000}
              className='object-cover size-full'
          />
        </section>
    </main>
  )
}

export default layout
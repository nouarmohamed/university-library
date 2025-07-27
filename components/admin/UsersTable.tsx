import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

interface Props {
    tableTitle: string
    users: User[]
}
const UsersTable = async ({ tableTitle, users }: Props) => {
  return (
    <div className='m-5 p-5 mb-20 bg-white rounded-xl'>
      <header className='flex justify-between'>
        <h2 className='text-lg font-semibold text-slate-900'>{tableTitle}</h2>
        <div></div>
      </header>
      <section className="mt-5">
        <table>
          <thead className="bg-light-300 text-sm text-dark-200 rounded-md">
            <tr>
              <td className="p-3">Name</td>
              <td>Date Joined</td>
              <td>Role</td>
              <td>Books Borrowed</td>
              <td>University ID No</td>
              <td>University ID Card</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody className="text-sm text-dark-200 font-medium">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="flex gap-2 items-center p-3">
                  <Link href="/my-profile" className="flex-center gap-0.5">
                      <Avatar>
                          <AvatarFallback>{user.fullName ? getInitials(user.fullName) : "CN"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-dark-400">{user.fullName}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                  </Link>
                </td>
                <td>{user.createdAt?.toDateString().slice(4, 15)}</td>
                <td><div className={cn('p-2 rounded-full text-center', user.role === "USER" ? 'bg-pink-50 text-pink-700' : 'bg-green-50 text-green-700')}>{user.role}</div></td>
                <td>{10}</td>
                <td>{user.universityId}</td>
                <td>
                    <button>
                        <p className="text-blue-500 font-semibold">View ID Card</p>
                    </button>
                </td>
                <td className="flex gap-1">
                    {tableTitle === "Account Registration Requests" && 
                    <button className="bg-green-50 text-green-700 p-1">
                        Approve Account
                    </button>}
                    <button>
                        <Image 
                            src='/icons/admin/trash.svg'
                            alt='Delete User'
                            width={16}
                            height={16}
                        />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default UsersTable
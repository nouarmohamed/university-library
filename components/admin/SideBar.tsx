"use client";

import { adminSideBarLinks } from "@/constants"
import { Session } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { cn, getInitials } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { signOutAction } from "@/lib/actions/auth.action";

const SideBar = ({session}: {session: Session}) => {
    const {user} = session
    const pathname = usePathname()
    return (
        <nav className="flex flex-col h-screen justify-between w-[250px] py-10">
            <div className="flex flex-col px-5">
                <div className="flex flex-row gap-1">
                    <Image
                        src="/icons/admin/logo.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                    />
                    <h1 className="text-2xl font-bold text-[#25388C]">BookWise</h1>
                </div>
                <ul className="mt-10 flex flex-col gap-4">
                    {adminSideBarLinks.map((link) => {
                        const isActive = pathname === link.route || (pathname.includes(link.route) && link.route !== "/admin")
                        return (
                            <li key={link.route}>
                                <Link href={link.route} className={cn("flex flex-row gap-2 px-4 py-3 rounded-md", isActive && "bg-[#25388C]")}>
                                    <Image 
                                        src={link.img}
                                        alt={link.text}
                                        width={20}
                                        height={20}
                                        className={cn(isActive && "invert brightness-0")}
                                    />
                                    <p className={cn("text-[#3A354E]", isActive && "text-white")}>{link.text}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="rounded-full border border-light-500 m-1">
                {user && (
                    <Link href="/my-profile" className="flex-center gap-1 p-1">
                        <Avatar className="size-12">
                            <AvatarFallback>{user.name ? getInitials(user.name) : "CN"}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col max-w-full overflow-hidden mr-3">
                            <p className="text-base text-black font-semibold">{user.name}</p>
                            <p className="text-slate-600 text-sm">{user.email}</p>
                        </div>
                        <Image src="/icons/logout.svg" alt="Logout" width={34} height={34} onClick={() => signOutAction()} />
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default SideBar
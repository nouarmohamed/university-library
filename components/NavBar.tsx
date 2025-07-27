"use client";

import { navigationLinks } from "@/constants"
import Link from "next/dist/client/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { Session } from "next-auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { signOutAction } from "@/lib/actions/auth.action";

const NavBar = ({session}: {session: Session | null}) => {
    const { user } = session || {}

    const pathname = usePathname()

    return (
        <nav className="flex flex-row justify-between items-center py-10">
            <Link href={'/'} className="flex flex-row items-center gap-3">
                <Image src="/icons/logo.svg" alt="Logo" width={40} height={40} />
                <h1 className="text-2xl font-bold text-white">BookWise</h1>
            </Link>
            <div className="flex">
                <ul className="flex flex-row items-center gap-6">
                    {navigationLinks.map((link) => (
                        <li key={link.href} className={cn(pathname === link.href && "text-primary-100")}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                    <li className="flex items-center">
                        {user && (
                            <Link href="/my-profile" className="flex-center gap-1">
                                <Avatar>
                                    <AvatarFallback>{user.name ? getInitials(user.name) : "CN"}</AvatarFallback>
                                </Avatar>
                                <span>{user.name}</span>
                            </Link>
                        )}
                    </li>
                </ul>
                <Button className="cursor-pointer bg-transparent" type="button" onClick={() => signOutAction()}>
                    <Image src="/icons/logout.svg" alt="User Icon" width={24} height={24}/>
                </Button>
            </div>
        </nav>
    )
}

export default NavBar
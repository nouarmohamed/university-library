import { Session } from "next-auth"

const Header = ({session}: {session: Session}) => {
  return (
    <header className="flex flex-row justify-between p-5">
      <div>
        <h1 className="text-[#1E293B] text-2xl font-semibold">Welcome, {session?.user?.name}</h1>
        <p className="text-[#64748B]">Monitor all of your projects and tasks here</p>
      </div>
    </header>
  )
}

export default Header
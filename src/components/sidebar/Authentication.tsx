"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { Ellipsis } from "lucide-react"

export const Authentication = () => {
  const {data: session} = useSession()
 
 return <>
    {!session ? (
        <Button variant={"secondary"} className="w-full" onClick={() => signIn()}>Login</Button>
    ) : (
        <div className="flex hover:bg-white/10 duration-75 items-center cursor-pointer justify-between p-3 rounded-full">
            <div className="flex items-center gap-2">
                <img src={session.user?.image as string} alt="profile" className="w-10 h-10 rounded-full" />
                <span className="text-sm font-bold">{session.user?.name}</span>
            </div>
            <Ellipsis size={20}/>
        </div>
    )}
  </>
}
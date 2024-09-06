"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "../ui/button"

export const Authentication = () => {
  const {data: session} = useSession()
 
 return <>
    {!session ? (
        <Button variant={"secondary"} className="w-full" onClick={() => signIn()}>Login</Button>
    ) : (
        <div className="flex hover:bg-white/10 duration-75 items-center cursor-pointer justify-between p-3 rounded-full">
            <Button variant={"secondary"} className="w-full" onClick={() => signOut()}>Logout</Button>
        </div>
    )}
  </>
}
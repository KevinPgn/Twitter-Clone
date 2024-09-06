"use client"
import { Button } from "../ui/button"
import { followUser } from "@/server/Actions"

export const BtnFollow = ({userId}: {userId: string}) => {
  return <>
    <Button
    onClick={() => followUser({userId})}
    variant="outline" className="text-sm text-black mt-2 border border-white/10 px-4 py-1 rounded-full">Follow</Button>
  </>
}
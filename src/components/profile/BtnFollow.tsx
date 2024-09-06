"use client"
import { Button } from "../ui/button"
import { followUser, unfollowUser } from "@/server/Actions"

export const BtnFollow = ({userId, isFollowing}: {userId: string, isFollowing: boolean}) => {
  return <>
   {isFollowing ? <Button
    onClick={async () => {
      await unfollowUser({userId})
    }}
    variant="destructive" className="text-sm mt-2 border border-white/10 px-4 py-1 rounded-full">
      Unfollow
    </Button> : <Button
    onClick={async () => {
      await followUser({userId})
    }}
    variant="outline" className="text-sm text-black mt-2 border border-white/10 px-4 py-1 rounded-full">
      Follow
    </Button>}
  </>
}
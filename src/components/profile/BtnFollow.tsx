"use client"
import { Button } from "../ui/button"
import { followUser, unfollowUser } from "@/server/Actions"
import { useState } from "react"

export const BtnFollow = ({userId, isFollowing: initialIsFollowing}: {userId: string, isFollowing: boolean}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleFollowToggle = async () => {
    if (isFollowing) {
      await unfollowUser({userId});
    } else {
      await followUser({userId});
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <Button
      onClick={handleFollowToggle}
      variant="outline"
      className={`text-sm mt-2 border border-white/10 px-4 py-1 rounded-full ${isFollowing ? 'bg-red-500 hover:bg-red-600 hover:text-white' : 'bg-blue-500 hover:bg-blue-600 hover:text-white'}`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
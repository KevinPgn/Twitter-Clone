"use client"
import { Ellipsis } from "lucide-react"

export const EllipsisTweet = ({tweetId}: {tweetId: string}) => {
  return <div className="absolute top-0 right-0">
    <Ellipsis size={19} className="text-gray-500 cursor-pointer" />
  </div>
}
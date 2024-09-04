"use client"
import { FiHeart } from "react-icons/fi"
import { likeTheTweet } from "@/server/Actions"

export const LikedTheTweet = ({tweet, hasLiked}: {tweet: any, hasLiked: any}) => {
  
  return <div className="flex items-center group cursor-pointer gap-2 text-gray-400"
  onClick={async () => {
    await likeTheTweet({tweetId: tweet.id})
  }}>
    <FiHeart size={19} className={`group-hover:text-red-500 duration-75 ${hasLiked ? "text-red-500" : ""}`}/>
    <span className={`text-sm group-hover:text-red-500 duration-75 font-normal ${hasLiked ? "text-red-500" : ""}`}>{tweet._count.likes}</span>
  </div>
}
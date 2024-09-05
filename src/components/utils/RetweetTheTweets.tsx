"use client"
import { AiOutlineRetweet } from "react-icons/ai"
import { retweetTheTweet } from "@/server/Actions"

export const RetweetTheTweets = ({tweet, hasRetweeted}: {tweet:any, hasRetweeted: boolean}) => {
  return <div className="flex items-center group cursor-pointer gap-2 text-gray-400"
  onClick={() => retweetTheTweet({tweetId: tweet.id})}
  >
    <AiOutlineRetweet size={19} className={`group-hover:text-green-500 duration-75 ${hasRetweeted ? "text-green-500" : ""}`}/>
    <span className={`text-sm group-hover:text-green-500 duration-75 text-white/80 font-normal ${hasRetweeted ? "text-green-500" : ""}`}>{tweet._count.retweets}</span>
  </div>
}
"use client"
import { FiBookmark } from "react-icons/fi"
import { bookmarkTheTweet } from "@/server/Actions"

export const BookMarkedTheTweet = ({tweet, hasBookmarked}: {tweet:any, hasBookmarked: boolean}) => {
  return <>
    <FiBookmark size={19} className={`cursor-pointer hover:text-blue-500 duration-75 ${hasBookmarked ? "text-blue-500" : ""}`}
    onClick={() => bookmarkTheTweet({tweetId: tweet.id})}
    />
  </>
}
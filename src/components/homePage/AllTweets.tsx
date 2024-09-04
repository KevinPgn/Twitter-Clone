import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { FiMessageCircle, FiBookmark, FiShare } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { EllipsisTweet } from "./EllipsisTweet";
import { LikedTheTweet } from "../utils/LikedTheTweet";

export const AllTweets = async ({tweet, user}: {tweet: any, user: any}) => {
  const hasLiked = tweet.likes.map((like: any) => like.authorId)

  return <div 
  className="flex hover:bg-white/5 duration-75 cursor-pointer items-start gap-3 px-4 border-b border-white/10 p-3">
    <Link href={`/profile/${tweet.author.id}`}>
      <img src={tweet.author.image} alt="author post image" className="w-10 h-10 cursor-pointer rounded-full" />
    </Link>
    <div className="flex flex-col flex-1">
      <div className="flex relative items-center gap-1">
        <Link href={`/profile/${tweet.author.id}`} className="flex items-center gap-3">
          <span className="text-sm text-white hover:underline font-semibold">{tweet.author.name}</span>
          <span className="text-sm text-gray-500 font-normal">
            {formatDistanceToNow(tweet.createdAt, {addSuffix: false}).replace('about ', '').replace(' hour', 'h').replace(' minutes', 'm').replace(' minute', 'm').replace(' seconds', 's').replace(' second', 's')}
          </span>
        </Link>
        {user && user.id === tweet.author.id && <EllipsisTweet tweetId={tweet.id} />}
      </div>
      <p className="text-md text-white/90 mt-1">{tweet.content}</p>
      {tweet.imageUrl && <img src={tweet.imageUrl} alt="tweet image" className="w-full h-full object-cover mt-3 rounded-xl" />}
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center group cursor-pointer gap-2 text-gray-400">
          <FiMessageCircle size={19} className="group-hover:text-blue-500 duration-75"/>
          <span className="text-sm group-hover:text-blue-500 duration-75 text-gray-400 font-normal">{tweet._count.comments}</span>
        </div>
        <div className="flex items-center group cursor-pointer gap-2 text-gray-400">
          <AiOutlineRetweet size={19} className="group-hover:text-green-500 duration-75"/>
          <span className="text-sm group-hover:text-green-500 duration-75 text-white/80 font-normal">{tweet._count.retweets}</span>
        </div>
        <div className="flex items-center group cursor-pointer gap-2 text-gray-400">
            <LikedTheTweet tweet={tweet} hasLiked={hasLiked}/>
        </div>
        <div className="flex items-center group cursor-pointer gap-2 text-gray-400">
          <IoIosStats size={19} className="group-hover:text-blue-500 duration-75"/>
          <span className="text-sm group-hover:text-blue-500 duration-75 font-normal">{tweet.views}</span>
        </div>

        <div className="flex items-center gap-5 text-gray-400">
          <FiBookmark size={19} className="cursor-pointer hover:text-blue-500 duration-75"/>
          <FiShare size={19} className="cursor-pointer hover:text-blue-500 duration-75"/>
        </div>
      </div>
    </div>
  </div>
}
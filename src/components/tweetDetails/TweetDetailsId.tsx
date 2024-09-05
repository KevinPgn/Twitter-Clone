import { formatDistanceToNow } from "date-fns"
import { FiMessageCircle, FiShare } from "react-icons/fi"
import { IoIosStats } from "react-icons/io"
import { BookMarkedTheTweet } from "../utils/BookMarkedTheTweet"
import { LikedTheTweet } from "../utils/LikedTheTweet"
import { RetweetTheTweets } from "../utils/RetweetTheTweets"
import { CommentsForm } from "./CommentsForm"

export const TweetDetailsId = ({tweet, user}: {tweet: any, user: any}) => {
  const hasLiked = tweet.isLiked
  const hasRetweeted = tweet.isRetweeted
  const hasBookmarked = tweet.isBookmarked

  return <div className="p-3 px-5">
    <div className="flex items-center gap-3">
        <img src={tweet.author.image} alt="user pdp" className="w-10 h-10 rounded-full" />
        <div className="flex flex-col">
            <span className="text-md font-semibold">{tweet.author.name}</span>
            <span className="text-xs text-gray-500">@{tweet.author.name}</span>
        </div>
    </div>

    <p className="text-md text-white/90 mt-3">{tweet.content}</p>
    {tweet.imageUrl && <img src={tweet.imageUrl} alt="tweet image" className="w-full h-full object-cover mt-3 rounded-xl" />}

    <div className="flex items-center gap-3 mt-3">
      <span className="text-sm text-gray-500">{formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}</span>
      <span className="text-sm text-gray-500">·</span>
      <span className="text-sm text-gray-500">{tweet.views} views</span>
    </div>

    <div className="flex items-center justify-around border-t border-b border-white/10 py-4 mt-5">
        <div className="flex items-center group cursor-pointer gap-2 text-gray-400">
          <FiMessageCircle size={19} className="group-hover:text-blue-500 duration-75"/>
          <span className="text-sm group-hover:text-blue-500 duration-75 text-gray-400 font-normal">{tweet._count.comments}</span>
        </div>
        <div className="flex items-center group cursor-pointer gap-2 text-gray-400">
            <RetweetTheTweets tweet={tweet} hasRetweeted={hasRetweeted}/>
        </div>
        <div className="flex items-center group cursor-pointer gap-2 text-gray-400">
            <LikedTheTweet tweet={tweet} hasLiked={hasLiked}/>
        </div>
        <div className="flex items-center group cursor-pointer gap-2 text-gray-400">
          <IoIosStats size={19} className="group-hover:text-blue-500 duration-75"/>
          <span className="text-sm group-hover:text-blue-500 duration-75 font-normal">{tweet.views}</span>
        </div>

        <div className="flex items-center gap-5 text-gray-400">
          <BookMarkedTheTweet tweet={tweet} hasBookmarked={hasBookmarked}/>
          <FiShare size={19} className="cursor-pointer hover:text-blue-500 duration-75"/>
        </div>
    </div>

    {user ? <CommentsForm userImage={user.image} tweetId={tweet.id}/> : <div>Veuillez vous connecter pour mettre un commentaire</div>}

    <div className="mt-5 flex flex-col">
    {tweet.comments.map((comment: any) => (
      <div className="flex gap-3 border-b cursor-pointer hover:bg-white/5 p-3 duration-75 border-white/10" key={comment.id}>
        <img src={comment.author.image} alt="user pdp" className="w-10 h-10 rounded-full" />
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{comment.author.name}</span>
            <span className="text-gray-500">@{comment.author.name}</span>
          </div>
          <p className="text-white/90 mt-2">{comment.content}</p>

        </div>
      </div>
    ))}
    </div>
  </div>
}
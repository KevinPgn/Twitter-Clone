"use client"
import { Button } from "@/components/ui/button"
import { createCommentsToTheTweet } from "@/server/Actions"
import { useForm } from "react-hook-form"

export const CommentsForm = ({userImage, tweetId}: {userImage: string, tweetId: string}) => {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
    if (!data.content) return;

    await createCommentsToTheTweet({tweetId, content: data.content})
  }

  return <form onSubmit={handleSubmit(onSubmit)} className="flex border-b border-white/10 items-center justify-between pb-5 gap-3 mt-4">
    <img src={userImage} alt="user image" className="w-10 h-10 rounded-full" />
    <input placeholder="Write a comment" className="bg-transparent outline-none flex-1" {...register("content")} />
    <div className="flex items-center gap-3">
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            Answer
        </Button>
    </div>
  </form>
}
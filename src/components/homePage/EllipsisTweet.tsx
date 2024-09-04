"use client"
import { Ellipsis } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Pen, Trash2 } from "lucide-react"
import { deleteTweet } from "@/server/Actions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const EllipsisTweet = ({tweetId}: {tweetId: string}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDeleteTweet = async () => {
    try{
      await deleteTweet({tweetId})
      toast.success("Tweet deleted", { style: { background: "black", color: "white" } })
      setIsOpen(false)
    }catch(error){
      toast.error("Error deleting tweet")
    }
  }

  return <div className="absolute top-0 right-0">
      <Ellipsis size={19} className="text-gray-500 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
      {isOpen && <div className="absolute w-[150px] bg-black border border-white/10 rounded-xl shadow-md shadow-white/10 p-2 top-5 right-5">
        <Button variant="ghost" className="w-full hover:bg-blue-500/20 hover:text-blue-500 text-white flex justify-start">
          <Pen size={19} className="mr-2" />
          Edit
        </Button>
        <Button
        onClick={handleDeleteTweet}
        variant="ghost" className="w-full hover:bg-red-500/20 hover:text-red-500 text-white flex justify-start">
          <Trash2 size={19} className="mr-2" />
          Delete
        </Button>
      </div>}

      <ToastContainer />
    </div>
}

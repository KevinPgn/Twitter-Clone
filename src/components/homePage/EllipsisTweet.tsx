"use client"
import { Ellipsis } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"

export const EllipsisTweet = ({tweetId}: {tweetId: string}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return <div className="absolute top-0 right-0">
      <Ellipsis size={19} className="text-gray-500 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
      {isOpen && <div className="absolute w-[150px] bg-black border border-white/10 rounded-xl shadow-md shadow-white/10 p-2 top-5 right-5">
        <Button variant="ghost" className="w-full text-white/80">Edit</Button>
        <Button variant="ghost" className="w-full text-white/80">Delete</Button>
      </div>}
    </div>
}

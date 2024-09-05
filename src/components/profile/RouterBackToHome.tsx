"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const RouterBackToHome = ({user}: {user: any}) => {
  const router = useRouter()

  return <div className="flex items-center gap-3 px-5 py-2">
    <Button variant="ghost" onClick={() => router.back()} className="flex items-center">
        <ArrowLeft size={17}/>
    </Button>
    <div className="flex flex-col">
        <span className="text-md font-bold">{user.name}</span>
        <span className="text-sm text-gray-500">{user._count.tweets} tweets</span>
    </div>
  </div>   
}
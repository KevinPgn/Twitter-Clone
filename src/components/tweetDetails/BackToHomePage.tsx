"use client"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export const BackToHomePage = () => {
  const router = useRouter()

  return <div className="flex items-center gap-2 px-4 py-3">
    <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ArrowLeft size={20} className="cursor-pointer" />
    </Button>
    <span className="text-xl font-semibold">Back</span>
  </div>
}
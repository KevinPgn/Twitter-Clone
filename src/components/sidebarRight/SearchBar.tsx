"use client"
import { Search } from "lucide-react"

export const SearchBar = () => {
  return <div className="flex items-center gap-3 px-4 py-3 mt-3 bg-white/10 rounded-full">
    <Search size={20} className="text-gray-400"/>
    <input type="text" placeholder="Search On Twitter..." className="bg-transparent outline-none text-white/80 text-sm w-full" />
  </div>
}
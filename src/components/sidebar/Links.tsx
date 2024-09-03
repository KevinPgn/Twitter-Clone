"use client"
import {Home, Search, Bell, Mail, Bookmark, Wallet, Users2, X, CloudLightning, User, CircleEllipsis} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Links = () => {
  const pathname = usePathname()
  return <div className="mt-2 flex flex-col gap-2">
    <Link href="/" className={`flex items-center w-fit gap-4 rounded-full hover:bg-white/10 duration-75 p-3 ${pathname === "/" ? "font-bold" : ""}`}>
      <Home size={25} className={`${pathname === "/" ? "text-white" : "text-gray-300"}`}/>
      <span className="text-lg">Accueil</span>
    </Link>
    <Link href="/explorer" className="flex items-center w-fit gap-4 rounded-full hover:bg-white/10 duration-75 p-3">
      <Search size={25} className={`${pathname === "/explorer" ? "text-white" : "text-gray-300"}`}/>
      <span className="text-lg">Explorer</span>
    </Link>
    <Link href="/notifications" className="flex items-center w-fit gap-4 rounded-full hover:bg-white/10 duration-75 p-3">
      <Bell size={25} className={`${pathname === "/notifications" ? "text-white" : "text-gray-300"}`}/>
      <span className="text-lg">Notifications</span>
    </Link>
    <Link href="/messages" className="flex items-center w-fit gap-4 rounded-full hover:bg-white/10 duration-75 p-3">
      <Mail size={25} className={`${pathname === "/messages" ? "text-white" : "text-gray-300"}`}/>
      <span className="text-lg">Messages</span>
    </Link>
    <Link href="/bookmarks" className="flex items-center w-fit gap-4 rounded-full hover:bg-white/10 duration-75 p-3">
      <Bookmark size={25} className={`${pathname === "/bookmarks" ? "text-white" : "text-gray-300"}`}/>
      <span className="text-lg">Bookmarks</span>
    </Link>
    <Link href="/emplois" className="flex items-center w-fit gap-4 rounded-full hover:bg-white/10 duration-75 p-3">
      <Wallet size={25} className={`${pathname === "/emplois" ? "text-white" : "text-gray-300"}`}/>
      <span className="text-lg">Emplois</span>
    </Link>
    <Link href="/communautes" className="flex items-center w-fit gap-4 rounded-full hover:bg-white/10 duration-75 p-3">
      <Users2 size={25} className={`${pathname === "/communautes" ? "text-white" : "text-gray-300"}`}/>
      <span className="text-lg">Communautés</span>
    </Link>
    <Link href="/premium" className="flex items-center w-fit gap-4 rounded-full hover:bg-white/10 duration-75 p-3">
      <img src="/logo-twitter-x.jpg" alt="premium" className="w-7 h-7 cursor-pointer rounded-full" />
      <span className="text-lg">Premium</span>
    </Link>
    <Link href="/organisations" className="flex items-center w-fit gap-4 rounded-full hover:bg-white/10 duration-75 p-3">
      <CloudLightning size={25} className={`${pathname === "/organisations" ? "text-white" : "text-gray-300"}`}/>
      <span className="text-lg">Organisations certi</span>
    </Link>
    <Link href="/profil" className="flex items-center w-fit gap-4 rounded-full hover:bg-white/10 duration-75 p-3">
      <User size={25} className={`${pathname === "/profil" ? "text-white" : "text-gray-300"}`}/>
      <span className="text-lg">Profil</span>
    </Link>
    <Link href="/plus" className="flex items-center w-fit gap-4 rounded-full hover:bg-white/10 duration-75 p-3">
      <CircleEllipsis size={25} className={`${pathname === "/plus" ? "text-white" : "text-gray-300"}`}/>
      <span className="text-lg">Plus</span>
    </Link>
  </div>
}
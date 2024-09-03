import { ButtonPost } from "./ButtonPost"
import { Links } from "./Links"
import { Authentication } from "./Authentication"
import Link from "next/link"

export const Sidebar = () => {
  return <div className="w-[275px] justify-between py-3 flex flex-col">
    <div className="flex flex-col">
        <Link href="/">
            <img src="/logo-twitter-x.jpg" alt="logo" className="w-9 h-9 cursor-pointer rounded-full" />
        </Link>
        
        <Links />
        <ButtonPost />
    </div>

    <div className="mt-3">
        <Authentication />
    </div>
  </div> 
}
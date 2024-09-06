import { ButtonPost } from "./ButtonPost"
import { Links } from "./Links"
import { Authentication } from "./Authentication"
import Link from "next/link"
import { auth } from "@/lib/auth"

export const Sidebar = async () => {
  const session = await auth()
  const user = session?.user

  return <div className="w-[255px] max-sm:hidden justify-between py-3 flex flex-col">
    <div className="flex flex-col">
        <Link href="/" className="cursor-pointer hover:bg-white/10 w-fit duration-75 p-2 rounded-full">
            <img src="/logo-twitter-x.jpg" alt="logo" className="w-8 h-8 cursor-pointer rounded-full" />
        </Link>

        <Links />
        <ButtonPost user={user}/>
    </div>

    <div className="mt-3">
        <Authentication />
    </div>
  </div> 
}
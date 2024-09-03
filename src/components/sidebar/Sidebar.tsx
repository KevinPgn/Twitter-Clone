import { ButtonPost } from "./ButtonPost"
import { Links } from "./Links"
import { Authentication } from "./Authentication"

export const Sidebar = () => {
  return <div className="w-[275px] justify-between py-3 flex flex-col">
    <div className="flex flex-col">
        <h2 className="text-xl font-bold cursor-pointer">TwitterClone</h2>    
        <Links />
        <ButtonPost />
    </div>

    <div className="mt-3">
        <Authentication />
    </div>
  </div> 
}
import { SearchBar } from "./SearchBar"
import { Subscribe } from "./Subscribe"
import { SuggestionsUsers } from "./SuggestionsUsers"
import { Tendances } from "./Tendances"

export const SidebarRight = () => {
  return <div className="w-[350px] max-lg:hidden flex flex-col gap-5 h-full">
    <SearchBar />
    <Subscribe />
    <SuggestionsUsers />
    <Tendances />
  </div>
}
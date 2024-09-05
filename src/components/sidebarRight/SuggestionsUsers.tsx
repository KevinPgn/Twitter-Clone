import { Button } from "../ui/button"

export const SuggestionsUsers = () => {
  return <div className="border border-white/10 rounded-2xl flex flex-col gap-5 p-5">
    <h2 className="text-xl font-bold mb-2">Suggestions</h2>

    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10"></div>
            <span className="text-sm font-bold">John Doe</span>
        </div>
        <Button variant="outline" className="rounded-full px-4 py-2 text-sm text-black">
            Suivre
        </Button>
    </div>

    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-800"></div>
            <span className="text-sm font-bold">John Doe</span>
        </div>
        <Button variant="outline" className="rounded-full px-4 py-2 text-sm text-black">
            Suivre
        </Button>
    </div>

    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-800"></div>
            <span className="text-sm font-bold">John Doe</span>
        </div>
        <Button variant="outline" className="rounded-full px-4 py-2 text-sm text-black">
            Suivre
        </Button>
    </div>
  </div>
}
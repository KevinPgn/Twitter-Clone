import { Button } from "../ui/button"
// Number of posts with the same hashtag

export const Tendances = () => {
  return <div className="border border-white/10 rounded-2xl flex flex-col gap-5 p-5">
    <h2 className="text-xl font-bold mb-2">Tendances</h2>

    <div className="flex flex-col gap-2">
      <div className="flex items-center cursor-pointer hover:bg-white/10 p-2 duration-75 rounded-lg justify-between">
        <span className="text-md font-bold">#Hashtag</span>
        <span className="text-sm text-gray-500">100 posts</span>
      </div>
      <div className="flex items-center cursor-pointer hover:bg-white/10 p-2 duration-75 rounded-lg justify-between">
        <span className="text-md font-bold">#Hashtag</span>
        <span className="text-sm text-gray-500">50 posts</span>
      </div>
      <div className="flex items-center cursor-pointer hover:bg-white/10 p-2 duration-75 rounded-lg justify-between">
        <span className="text-md font-bold">#Hashtag</span>
        <span className="text-sm text-gray-500">100 posts</span>
      </div>
      <div className="flex items-center cursor-pointer hover:bg-white/10 p-2 duration-75 rounded-lg justify-between">
        <span className="text-md font-bold">#Hashtag</span>
        <span className="text-sm text-gray-500">100 posts</span>
      </div>
      <div className="flex items-center cursor-pointer hover:bg-white/10 p-2 duration-75 rounded-lg justify-between">
        <span className="text-md font-bold">#Hashtag</span>
        <span className="text-sm text-gray-500">100 posts</span>
      </div>
      
    </div>
  </div>
}
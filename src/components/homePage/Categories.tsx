// TODO: Add shadcn tab for this components

export const Categories = () => {
  return <div className="w-full border-b border-white/10">
    <div className="flex items-center justify-between text-center h-full">
      <span className="text-md relative
      after:content-[''] after:absolute after:bottom-0 after:left-[25%] after:w-[50%] after:h-[2px] after:bg-blue-500 after:rounded-full
      font-bold hover:bg-white/10 duration-75 w-[50%] py-3 cursor-pointer">Pour vous</span>
      <span className="text-md text-gray-400 hover:bg-white/10 w-[50%] duration-75 py-3 cursor-pointer">Abonnements</span>
    </div>
  </div>
}
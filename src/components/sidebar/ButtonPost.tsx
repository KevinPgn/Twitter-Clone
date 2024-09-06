"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { FormCreatePostBtn } from "./FormCreatePostBtn"

export const ButtonPost = ({user}: {user: any}) => {
  const [modalOpen, setModalOpen] = useState(false)
  
  return <div className="mt-5 w-full">
    <Button 
    onClick={() => setModalOpen(true)}
    className="bg-blue-500 py-6 rounded-full text-md hover:bg-blue-600 w-full">Poster</Button>

    {modalOpen && (
      <div 
      onClick={() => setModalOpen(false)}
      className="fixed z-10 top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
        <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#16181C] w-[600px] p-4 rounded-lg">
          <FormCreatePostBtn user={user} setModalOpen={setModalOpen}/>
        </div>
      </div>
    )}
  </div>
}
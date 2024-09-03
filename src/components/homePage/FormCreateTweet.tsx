"use client"
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Image, List, Smile, CalendarClock, MapPin } from 'lucide-react';

export const FormCreateTweet = ({user}: {user: any}) => {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return <div className="flex gap-3 items-start border-b border-white/10 p-4">
    <img src={user.image} alt="user pdp" className="w-10 h-10 rounded-full" />

    <div className="flex flex-1 flex-col gap-2 py-1">
        <textarea 
        ref={textareaRef}
        placeholder="Quoi de neuf ?!"
        name="content" 
        value={content}
        onChange={handleChange}
        className="bg-transparent text-lg outline-none font-normal text-white placeholder:text-white/50 resize-none w-full overflow-hidden"></textarea>
    
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <Image size={20} className='cursor-pointer text-blue-400 hover:text-blue-500 duration-75'/>
                <List size={20} className='cursor-pointer text-blue-400 hover:text-blue-500 duration-75'/>
                <Smile size={20} className='cursor-pointer text-blue-400 hover:text-blue-500 duration-75'/>
                <CalendarClock size={20} className='cursor-pointer text-blue-400 hover:text-blue-500 duration-75'/>
                <MapPin size={20} className='cursor-not-allowed text-gray-700'/>
            </div>
            <Button className='bg-blue-500 hover:bg-blue-600 h-fit text-sm rounded-full'>Poster</Button>
        </div>
    </div>
  </div>
}
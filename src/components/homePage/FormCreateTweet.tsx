"use client"
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Image, ImagePlay, List, Smile, CalendarClock, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import EmojiPicker, { Theme } from 'emoji-picker-react';

export const FormCreateTweet = ({user}: {user: any}) => {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const limitContent = 280;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleEmojiClick = (emojiData: any) => {
    setContent(prevContent => prevContent + emojiData.emoji);
    setShowEmojiPicker(false);
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
        className={`bg-transparent text-lg outline-none font-normal ${
          content.length > limitContent ? 'text-red-500' : 'text-white'
        } placeholder:text-white/50 resize-none w-full overflow-hidden`}
        ></textarea>
        {content.length > limitContent && (
          <span className='text-red-500 text-sm'>{content.length} / {limitContent}</span>
        )}
    
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <Image size={20} className='cursor-pointer text-blue-400 hover:text-blue-500 duration-75'/>
                <ImagePlay size={20} className='cursor-pointer text-blue-400 hover:text-blue-500 duration-75'/>
                <List size={20} className='cursor-pointer text-blue-400 hover:text-blue-500 duration-75'/>
                <Smile 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                size={20} className='cursor-pointer relative text-blue-400 hover:text-blue-500 duration-75'/>
                <CalendarClock size={20} className='cursor-pointer text-blue-400 hover:text-blue-500 duration-75'/>
                <MapPin size={20} className='cursor-not-allowed text-gray-700'/>
            
                {showEmojiPicker && (
                  <div className='absolute bottom-10 left-0'>
                    <EmojiPicker
                    theme={Theme.DARK}
                    skinTonesDisabled
                    onEmojiClick={handleEmojiClick} />
                  </div>
                )}
            </div>
            <div className='flex items-center gap-2'>

                {content.length > 0 && (
                <div className="relative w-5 h-5">
                  <svg className="w-full h-full" viewBox="0 0 24 24">
                    <circle
                      className="text-gray-300"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="transparent"
                      r="10"
                      cx="12"
                      cy="12"
                    />
                    <circle
                      className="text-blue-500"
                      strokeWidth="2"
                      strokeDasharray={`${(content.length / limitContent) * 62.83} 62.83`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="10"
                      cx="12"
                      cy="12"
                    />
                  </svg>
                </div>
                )}

                <div className='h-[30px] w-[1px] bg-white/10'></div>
                <Button className='bg-blue-500 hover:bg-blue-600 h-fit text-sm rounded-full'
                disabled={content.length === 0 || content.length > limitContent}>Poster</Button>
            </div>
        </div>
    </div>
  </div>
}
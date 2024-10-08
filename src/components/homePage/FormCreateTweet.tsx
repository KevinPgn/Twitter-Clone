"use client"
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Image, ImagePlay, List, Smile, CalendarClock, MapPin } from 'lucide-react';
import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react';
import { useRouter } from 'next/navigation';
import { createTweet } from '@/server/Actions';
import { UploadDropzone } from '@/lib/uploadthing';

export const FormCreateTweet = ({user}: {user: any}) => {
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>("");
  const [isActive, setIsActive] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const limitContent = 280;
  const router = useRouter();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji;
    const newContent = content + emoji;
    setContent(newContent);
    if (textareaRef.current) {
      textareaRef.current.value = newContent;
    }
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.length === 0 || content.length > limitContent) return;
    try {
      const test = await createTweet({content, imageUrl: image || ""});
      console.log(test);
      setContent('');
      setImage("");
    } catch (error) {
      console.error(error);
    }
  }

  return <form onSubmit={handleSubmit} className="flex gap-3 items-start border-b border-white/10 p-4">
    <img
    onClick={() => router.push(`/profile/${user.id}`)}
    src={user && user.image} alt="user pdp" className="w-10 h-10 rounded-full cursor-pointer" />

    <div className="flex flex-1 flex-col gap-2 py-1">
        <textarea 
        ref={textareaRef}
        onChange={handleChange}
        value={content}
        placeholder="Quoi de neuf ?!"
        className={`bg-transparent text-lg outline-none font-normal ${
          content.length > limitContent ? 'text-red-500' : 'text-white'
        } placeholder:text-white/50 resize-none w-full overflow-hidden`}
        ></textarea>
        {image && <img src={image} alt="image" className='w-full h-full object-cover' />}
        {content.length > limitContent && (
          <span className='text-red-500 text-sm'>{content.length} / {limitContent}</span>
        )}
    
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <Image
                onClick={() => setIsActive(!isActive)}
                size={20} className='cursor-pointer text-blue-400 hover:text-blue-500 duration-75'/>
                <ImagePlay size={20} className='cursor-pointer text-blue-400 hover:text-blue-500 duration-75'/>
                <Smile 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                size={20} className='cursor-pointer relative text-blue-400 hover:text-blue-500 duration-75'/>
                <List size={20} className='text-gray-700'/>
                <CalendarClock size={20} className='text-gray-700'/>
                <MapPin size={20} className='text-gray-700'/>
            
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
                <Button type='submit' className='bg-blue-500 hover:bg-blue-600 h-fit text-sm rounded-full'
                disabled={content.length === 0 || content.length > limitContent}>Poster</Button>
            </div>
        </div>
    </div>

    {isActive && (
      <div
      onClick={() => setIsActive(false)}
      className='absolute top-0 left-0 inset-0 flex items-center justify-center bg-black/50'>
        <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white/10 p-4 rounded-lg'>
          <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setImage(res[0].url);
        }}
        onUploadError={(error) => {
          console.log(error);
        }}
        />
        </div>
      </div>
    )}
  </form>
}